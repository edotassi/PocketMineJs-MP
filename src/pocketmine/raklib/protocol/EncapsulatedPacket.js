var rakLib = require("../Binary");
var EncapulatedPacket = (function () {
    function EncapulatedPacket() {
        this.hasSplit = false;
        this.length = 0;
        this.needACK = false;
    }
    EncapulatedPacket.fromBinary = function (binary, setOffset, internal, offset) {
        if (internal === void 0) { internal = false; }
        if (offset === void 0) { offset = 0; }
        var packet = new EncapulatedPacket();
        var flags = parseInt(binary[0].toString());
        var reliability = (flags & 0xe0) >> 5;
        var hasSplit = (flags & 0x10) > 0;
        packet.reliability = reliability;
        packet.hasSplit = hasSplit;
        var length = 0;
        if (internal) {
            var bufLength = new Buffer(4);
            var bufAck = new Buffer(4);
            binary.copy(bufLength, 0, 1, 4);
            binary.copy(bufAck, 0, 5, 9);
            length = rakLib.Binary.readInt(bufLength);
            packet.identifierACK = rakLib.Binary.readInt(bufAck);
            offset = 9;
        }
        else {
            var buf = new Buffer(2);
            binary.copy(buf, 0, 1, 2);
            length = Math.ceil(rakLib.Binary.readShort(buf) / 8.0);
            offset = 3;
            packet.identifierACK = null;
        }
        if (reliability === 2 || reliability === 3 || reliability === 4 || reliability === 6 || reliability === 7) {
            var buf = new Buffer(3);
            binary.copy(buf, 0, offset, offset + 3);
            packet.messageIndex = rakLib.Binary.readLTriad(buf);
            offset += 3;
        }
        else {
            packet.messageIndex = null;
        }
        if (reliability === 1 || reliability === 3 || reliability === 4 || reliability === 7) {
            var buf = new Buffer(3);
            binary.copy(buf, 0, offset, offset + 3);
            packet.orderIndex = rakLib.Binary.readLTriad(buf);
            offset += 3;
            packet.orderChannel = parseInt(binary[offset++].toString());
        }
        else {
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
        }
        else {
            packet.splitCount = null;
            packet.splitID = null;
            packet.splitIndex = null;
        }
        var packetBuffer = new Buffer(length);
        binary.copy(packetBuffer, 0, offset, offset + length);
        packet.buffer = packetBuffer;
        offset += length;
        setOffset(offset);
        return packet;
    };
    EncapulatedPacket.prototype.getTotalLength = function () {
        return 3 + this.buffer.length + (this.messageIndex ? 3 : 0) + (this.orderIndex ? 4 : 0) + (this.hasSplit ? 9 : 0);
    };
    EncapulatedPacket.prototype.toBinary = function (internal) {
        if (internal === void 0) { internal = false; }
        var arrayBuf = [];
        arrayBuf.push((this.reliability << 5) | (this.hasSplit ? 0x10 : 0));
        if (internal) {
            var bufLen = rakLib.Binary.writeInt(this.buffer.length);
            arrayBuf.push(bufLen[0], bufLen[1], bufLen[2], bufLen[3]);
            var bufAck = rakLib.Binary.writeInt(this.identifierACK);
            arrayBuf.push(bufAck[0], bufAck[1], bufAck[2], bufAck[3]);
        }
        else {
            var bufLen = rakLib.Binary.writeShort(this.buffer.length << 3);
            arrayBuf.push(bufLen[0], bufLen[1]);
        }
        if (this.reliability === 2 || this.reliability === 3 || this.reliability === 4 || this.reliability === 6 || this.reliability === 7) {
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
    };
    EncapulatedPacket.prototype.__toString = function () {
        return this.toBinary().toString();
    };
    return EncapulatedPacket;
})();
exports.EncapulatedPacket = EncapulatedPacket;
