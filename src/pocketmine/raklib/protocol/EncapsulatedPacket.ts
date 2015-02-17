
import rakLib = require("../Binary");

export class EncapulatedPacket  {
    
    public reliability: number;
    public hasSplit: boolean = false;
    public length: number = 0;
    public messageIndex: number;
    public orderIndex: number;
    public orderChannel: number;
    public splitCount: number;
    public splitID: number;
    public splitIndex: number;
    public buffer: Buffer;
    public needACK: boolean = false;
    public identifierACK: number;

    public static fromBinary(binary: Buffer, setOffset: (resultingOffset: number) => void, internal: boolean = false, offset: number = 0): EncapulatedPacket {
        var packet: EncapulatedPacket = new EncapulatedPacket();

        var flags: number = parseInt(binary[0].toString());
        var reliability: number = (flags & 0xe0) >> 5;
        var hasSplit = (flags & 0x10) > 0;

        packet.reliability = reliability;
        packet.hasSplit = hasSplit;

        var length: number = 0;

        if (internal) {
            var bufLength = new Buffer(4);
            var bufAck = new Buffer(4);
            binary.copy(bufLength, 0, 1, 4); // TODO correct?
            binary.copy(bufAck, 0, 5, 9); // TODO correct?
            length = rakLib.Binary.readInt(bufLength);
            packet.identifierACK = rakLib.Binary.readInt(bufAck);
            offset = 9;
        } else {
            var buf = new Buffer(2);
            binary.copy(buf, 0, 1, 2);
            length = Math.ceil(rakLib.Binary.readShort(buf) / 8.0);
            offset = 3;
            packet.identifierACK = null;
        }

         /**
         * From http://www.jenkinssoftware.com/raknet/manual/reliabilitytypes.html
         *
         * Default: 0b010 (2) or 0b011 (3)
         *
         * 0: UNRELIABLE
         * 1: UNRELIABLE_SEQUENCED
         * 2: RELIABLE
         * 3: RELIABLE_ORDERED
         * 4: RELIABLE_SEQUENCED
         * 5: UNRELIABLE_WITH_ACK_RECEIPT
         * 6: RELIABLE_WITH_ACK_RECEIPT
         * 7: RELIABLE_ORDERED_WITH_ACK_RECEIPT
         */

        if (reliability === 2 || reliability === 3 || reliability === 4 || reliability === 6 || reliability === 7) {
            var buf = new Buffer(3);
            binary.copy(buf, 0, offset, offset + 3); // TODO correct?
            packet.messageIndex = rakLib.Binary.readLTriad(buf);
            offset += 3;
        } else {
            packet.messageIndex = null;
        }

        if (reliability === 1 || reliability === 3 || reliability === 4 || reliability === 7) {
            var buf = new Buffer(3);
            binary.copy(buf, 0, offset, offset + 3);
            packet.orderIndex = rakLib.Binary.readLTriad(buf);
            offset += 3;
            packet.orderChannel = parseInt(binary[offset++].toString());
        } else {
            packet.orderIndex = null;
            packet.orderChannel = null;
        }

        if (hasSplit) {
            var bufSplitCount = new Buffer(4);
            var bufID = new Buffer(2);
            var bufIndex = new Buffer(4);

            binary.copy(bufSplitCount, 0, offset, offset + 4);
            offset += 4;
            binary.copy(bufID, 0, offset, offset + 2);
            offset += 2;
            binary.copy(bufIndex, 0, offset, offset + 4);
            offset += 4;

            packet.splitCount = rakLib.Binary.readInt(bufSplitCount);
            packet.splitID = rakLib.Binary.readShort(bufID);
            packet.splitIndex = rakLib.Binary.readInt(bufIndex);
        } else {
            packet.splitCount = null;
            packet.splitID = null;
            packet.splitIndex = null;
        }

        var packetBuffer:Buffer = new Buffer(length); // TODO correct?
        binary.copy(packetBuffer, 0, offset, offset + length);

        packet.buffer = packetBuffer;
        offset += length;

        setOffset(offset);

        return packet;
    }

    public getTotalLength(): number {
        return 3 + this.buffer.length + (this.messageIndex ? 3 : 0) + (this.orderIndex ? 4 : 0) + (this.hasSplit ? 9 : 0);
    }

    public toBinary(internal: boolean = false): Buffer {
        var arrayBuf: Array<number> = [];
        arrayBuf.push((this.reliability << 5) | (this.hasSplit ? 0x10 : 0));
        if (internal) {
            var bufLen = rakLib.Binary.writeInt(this.buffer.length);
            arrayBuf.push(bufLen[0], bufLen[1], bufLen[2], bufLen[3]);

            var bufAck = rakLib.Binary.writeInt(this.identifierACK);
            arrayBuf.push(bufAck[0], bufAck[1], bufAck[2], bufAck[3]);
        } else {
            var bufLen = rakLib.Binary.writeShort(this.buffer.length << 3);
            arrayBuf.push(bufLen[0], bufLen[1]);
        }

        if (this.reliability === 2 ||
            this.reliability === 3 ||
            this.reliability === 4 ||
            this.reliability === 6 ||
            this.reliability === 7) {
            var bufOrderIndex = rakLib.Binary.writeLTriad(this.orderIndex);
            arrayBuf.push(bufOrderIndex[0], bufOrderIndex[1], bufOrderIndex[2], this.orderChannel);
        }

        if (this.hasSplit) {
            var bufSplitCount = rakLib.Binary.writeInt(this.splitCount);
            var bufID = rakLib.Binary.writeShort(this.splitID);
            var bufSplitIndex = rakLib.Binary.writeInt(this.splitIndex);

            arrayBuf.push.apply(arrayBuf, bufSplitCount);
            arrayBuf.push.apply(arrayBuf, bufID);
            arrayBuf.push.apply(arrayBuf, bufSplitIndex);
        }

        arrayBuf.push.apply(arrayBuf, this.buffer);

        return new Buffer(arrayBuf);
    }

    public __toString(): string {
        return this.toBinary().toString();
    }
}