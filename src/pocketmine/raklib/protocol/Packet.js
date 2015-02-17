var rakLib = require("../Binary");
var Packet = (function () {
    function Packet() {
        this.offset = 0;
    }
    Object.defineProperty(Packet, "ID", {
        get: function () {
            return -1;
        },
        enumerable: true,
        configurable: true
    });
    Packet.prototype.get = function (len) {
        if (len < 0) {
            this.offset = this.buffer.length - 1;
            return new Buffer(0);
        }
        var buf = new Buffer(len);
        this.buffer.copy(buf, 0, this.offset);
        this.offset += len;
        return buf;
    };
    Packet.prototype.getLong = function (signed) {
        if (signed === void 0) { signed = true; }
        return rakLib.Binary.readLong(this.get(8));
    };
    Packet.prototype.getInt = function () {
        return rakLib.Binary.readInt(this.get(4));
    };
    Packet.prototype.getShort = function (signed) {
        return signed ? rakLib.Binary.readSignedShort(this.get(2)) : rakLib.Binary.readShort(this.get(2));
    };
    Packet.prototype.getTriad = function () {
        return rakLib.Binary.readTriad(this.get(3));
    };
    Packet.prototype.getLTriad = function () {
        return rakLib.Binary.readLTriad(this.get(3));
    };
    Packet.prototype.getByte = function () {
        return this.buffer[this.offset++];
    };
    Packet.prototype.getString = function () {
        var len = this.getShort(false);
        var bufString = this.get(len);
        return bufString.toString("utf8");
    };
    Packet.prototype.feof = function () {
        return this.buffer[this.offset] == undefined;
    };
    Packet.prototype.put = function (buffer) {
        this.buffer = Buffer.concat([this.buffer, buffer]);
    };
    Packet.prototype.putLong = function (v) {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeLong(v)]);
    };
    Packet.prototype.putInt = function (v) {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeInt(v)]);
    };
    Packet.prototype.putShort = function (v) {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeShort(v)]);
    };
    Packet.prototype.putTriad = function (v) {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeTriad(v)]);
    };
    Packet.prototype.putLTriad = function (v) {
    };
    Packet.prototype.putByte = function (v) {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeByte(v)]);
    };
    Packet.prototype.putString = function (v) {
        this.putShort(v.length);
        this.put(new Buffer(v));
    };
    Packet.prototype.encode = function () {
        this.buffer = new Buffer(String.fromCharCode(Packet.ID));
    };
    Packet.prototype.decode = function () {
        this.offset = 1;
    };
    Packet.prototype.clean = function () {
        this.buffer = null;
        this.offset = 0;
        this.sendTime = null;
        return this;
    };
    return Packet;
})();
exports.Packet = Packet;
