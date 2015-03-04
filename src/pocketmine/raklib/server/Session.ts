

import server = require("SessionManager");
import packet = require("../protocol/Packet");
import dataPacket = require("../protocol/DataPacket");
import dataPacket4 = require("../protocol/DATA_PACKET_4");
import packetAck = require("../protocol/ACK");
import packetNack = require("../protocol/NACK");
import encapsulatedPAcket = require("../protocol/EncapsulatedPacket");

export class Session {
    public static get STATE_UNCONNECTED(): number {
        return 0;
    }

    public static get STATE_CONNECTING_1(): number {
        return 1;
    }

    public static get STATE_CONNECTING_2(): number {
        return 2;
    }

    public static get STATE_CONNECTED(): number {
        return 3;
    }

    public static get WINDOW_SIZE(): number {
        return 1024;
    }

    protected messageIndex: number = 0;

    protected sessionManager: server.SessionManager;
    protected address: string;
    protected port: number;
    protected state: number = Session.STATE_UNCONNECTED;
    protected preJoinQueue: Array<any> = []; // TODO find type
    protected mtuSize: number = 548; // Min size
    protected id: number = 0;
    protected splitID: number = 0;

    protected sendSeqNumber: number = 0;
    protected lastSeqNumber: number = 0;

    protected lastUpdate: number;
    protected startTime: number;

    protected packetToSend: Array<dataPacket.DataPacket> = [];
    protected isActive: boolean;

    protected ACKQueue: Array<encapsulatedPAcket.EncapulatedPacket>;
    protected NACKQueue: Array<encapsulatedPAcket.EncapulatedPacket>;

    protected recoveryQueue: Array<dataPacket.DataPacket> = [];

    protected needACK: HashTable<Array<number>> = [];

    protected _sendQueue: dataPacket.DataPacket;
    
    protected windowStart: number;
    protected receiveWindow: HashTable<any>; // TODO find type
    protected windowEnd: number;

    protected reliableWindowStart: number;
    protected reliableWindowEnd: number;
    protected reliableWindow: Array<any>; // TODO find type
    protected lastReliableIndex: number = -1;

    constructor(sessionManager: server.SessionManager, address: string, port: number) {
        this.sessionManager = sessionManager;
        this.address = address;
        this.port = port;
        this._sendQueue = new dataPacket4.DATA_PACKET_4();
        this.lastUpdate = Date.now();
        this.startTime = Date.now();
        this.isActive = false;
        this.windowStart = -(Session.WINDOW_SIZE / 2);
        this.windowEnd = Session.WINDOW_SIZE / 2;

        this.reliableWindowStart = 0;
        this.reliableWindowEnd = Session.WINDOW_SIZE;
    }

    public getAddress(): string {
        return this.address;
    }

    public getPort(): number {
        return this.port;
    }

    public getID(): number {
        return this.id;
    }

    public update(time: number): void {
        if (!this.isActive && (this.lastUpdate + 10) < time) {
            this.disconnect("timeout");
            return;
        }
        this.isActive = false;

        if (this.ACKQueue.length > 0) {
            var pkAck = new packetAck.ACK();
            pkAck.packets = this.ACKQueue;
            this.sendPacket(pkAck);
            this.ACKQueue = [];
        }

        if (this.NACKQueue.length > 0) {
            var pkNack = new packetNack.NACK();
            pkNack.packets = this.NACKQueue;
            this.sendPacket(pkNack);
            this.NACKQueue = [];
        }

        if (this.packetToSend.length > 0) {
            var pk = this.packetToSend[0];
            pk.seqNumber = this.sendSeqNumber++;
            pk.sendTime = Date.now();
            pk.encode();
            this.recoveryQueue[pk.seqNumber] = pk;
            this.sendPacket(pk);

            this.packetToSend.splice(0, 1);
        }

        var keysNeedAck = Object.keys(this.needACK);
        if (keysNeedAck.length > 0) {
            for (var i = 0; i < keysNeedAck.length; i++) {
                var identifierAck = keysNeedAck[i];
                var indexes = this.needACK[identifierAck];
                if (indexes.length === 0) {
                    this.sessionManager.notifyACK(this, identifierAck);
                    delete this.needACK[identifierAck];
                }
            }
        }

        var keysReceivedWindows = Object.keys(this.receiveWindow);
        for (var i = 0; i < keysReceivedWindows.length; i++) {
            var seq = keysReceivedWindows[i];
            if (parseInt(seq) < this.windowStart) {
                delete this.receiveWindow[seq];
            } else {
                break;
            }
        }

        this.sendQueue();
    }

    public disconnect(reason: string = "unknow") {
        this.sessionManager.removeSession(this, reason);
    }

    public sendPacket(packet: packet.Packet): void {
        this.sessionManager.sendPacket(packet, this.address, this.port);
    }

    public sendQueue(): void {
        
    }

}