
import packet = require("Packet");
import protocol = require("EncapsulatedPacket");

export class DataPacket extends packet.Packet {

    public packets: Array<protocol.EncapulatedPacket> = [];
    public seqNumber: number;

    public encode(): void {
        super.encode();
        this.putLTriad(this.seqNumber);
        for (var i = 0; i < this.packets.length; i++) {
            var packet = this.packets[i];
            this.put(packet.toBinary());
        }
    }

    public length(): number {
        var len: number = 4;
        for (var i = 0; i < this.packets.length; i++) {
            var packet = this.packets[i];
            len += packet.getTotalLength();
        }
        return len;
    }

    public decode(): void {
        super.decode();
        this.seqNumber = this.getLTriad();

        while (!this.feof()) {
            var offset: number = 0;
            var bufPacket = new Buffer(this.buffer.length - this.offset);
            this.buffer.copy(bufPacket, 0, this.offset);
            var packet = protocol.EncapulatedPacket.fromBinary(bufPacket,(resultOffset) => {
                offset = resultOffset;
            }, false, offset);
            this.offset += offset;
            if (packet.buffer.length === 0) {
                break;
            }
            this.packets.push(packet);
        }
    }

    public clean(): packet.Packet {
        this.packets = [];
        this.seqNumber = null;
        return super.clean();
    }
}