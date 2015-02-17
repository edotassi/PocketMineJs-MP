
import raklibServer = require("RakLibServer");
import udpServerSocket = require("UDPServerSocket");

export class SessionManager {

    private server: raklibServer.RakLibServer;
    private socket: udpServerSocket.UdpServerSocket;

    constructor(rakLibServer: raklibServer.RakLibServer, udpServerSocket: udpServerSocket.UdpServerSocket) {
        this.server = rakLibServer;
        this.socket = udpServerSocket;

        this.server.setCallbackForRecvPacket(this.packetReceived);
    }

    public packetReceived(buffer: Buffer): void {
        
    }
}