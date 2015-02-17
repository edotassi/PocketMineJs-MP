var Binary = (function () {
    function Binary() {
    }
    Object.defineProperty(Binary, "BIG_ENDIAN", {
        get: function () {
            return 0x00;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Binary, "LITTLE_ENDIAN", {
        get: function () {
            return 0x01;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Binary, "ENDIANNESS", {
        get: function () {
            return this.os.endianness() == 'BE' ? this.BIG_ENDIAN : this.LITTLE_ENDIAN;
        },
        enumerable: true,
        configurable: true
    });
    Binary.readTriad = function (str) {
        var byte1 = str[0];
        var byte2 = str[1];
        var byte3 = str[2];
        return byte1 + (byte2 << 8) + (byte3 << 16);
    };
    Binary.writeTriad = function (value) {
        var buf = new Buffer(3);
        buf[2] = (value >> 16) & 0xff;
        buf[1] = (value >> 8) & 0xff;
        buf[0] = value & 0xff;
        return buf;
    };
    Binary.readLTriad = function (str) {
        var byte1 = str[0];
        var byte2 = str[1];
        var byte3 = str[2];
        return byte3 + (byte2 << 8) + (byte1 << 16);
    };
    Binary.writeLTriad = function (value) {
        var buf = new Buffer(3);
        buf[0] = (value >> 16) & 0xff;
        buf[1] = (value >> 8) & 0xff;
        buf[2] = value & 0xff;
        return buf;
    };
    Binary.readBool = function (b) {
        return this.readByte(b, false) === 0 ? false : true;
    };
    Binary.readByte = function (c, signed) {
        if (signed === void 0) { signed = true; }
        var b = c[0];
        if (signed) {
            return b << 24 >> 24;
        }
        else {
            return b;
        }
    };
    Binary.writeByte = function (c) {
        var buf = new Buffer(this.byte_size);
        buf.writeInt8(c, buf.length);
        return buf;
    };
    Binary.readShort = function (str) {
        return str.readUInt16BE(0);
    };
    Binary.readSignedShort = function (str) {
        return str.readInt16BE(0) << 16 >> 16;
    };
    Binary.writeShort = function (v) {
        var buf = new Buffer(this.short_size);
        buf.writeUInt16BE(v, 0);
        return buf;
    };
    Binary.readLShort = function (str, signed) {
        if (signed === void 0) { signed = true; }
        var unpacked = str.readUInt16LE(0);
        if (signed) {
            return unpacked << 16 >> 16;
        }
        else {
            return unpacked;
        }
    };
    Binary.writeLShort = function (value) {
        var buf = new Buffer(this.short_size);
        buf.writeInt16LE(value, 0);
        return buf;
    };
    Binary.readInt = function (str) {
        return str.readInt32BE(0);
    };
    Binary.writeInt = function (value) {
        var buf = new Buffer(this.int_size);
        buf.writeInt32BE(value, 0);
        return buf;
    };
    Binary.readLInt = function (str) {
        return str.readInt32LE(0);
    };
    Binary.writeLInt = function (value) {
        var buf = new Buffer(this.int_size);
        buf.writeInt32LE(value, 0);
        return buf;
    };
    Binary.readFloat = function (str) {
        return this.ENDIANNESS == this.BIG_ENDIAN ? str.readFloatBE(0) : str.readFloatLE(0);
    };
    Binary.writeFloat = function (value) {
        var buf = new Buffer(this.float_size);
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            buf.writeFloatBE(value, 0);
        }
        else {
            buf.writeFloatLE(value, 0);
        }
        return buf;
    };
    Binary.readLFloat = function (str) {
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            var buf = new Buffer(this.float_size);
            str.copy(buf);
            this.bufferTools.reverse(buf);
            return buf.readFloatBE(0);
        }
        else {
            return str.readFloatLE(0);
        }
    };
    Binary.writeLFloat = function (value) {
        var buf = new Buffer(this.float_size);
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            buf.writeFloatBE(value, 0);
            this.bufferTools.reverse(buf);
        }
        else {
            buf.writeFloatLE(value, 0);
        }
        return buf;
    };
    Binary.readDouble = function (str) {
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            return str.readDoubleBE(0);
        }
        else {
            var buf = new Buffer(this.double_size);
            str.copy(buf);
            return str.readDoubleLE(0);
        }
    };
    Binary.writeDouble = function (value) {
        var buf = new Buffer(this.double_size);
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            buf.writeDoubleBE(value, 0);
        }
        else {
            buf.writeDoubleLE(value, 0);
            this.bufferTools.reverse(buf);
        }
        return buf;
    };
    Binary.readLDouble = function (str) {
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            var buf = new Buffer(this.double_size);
            str.copy(buf);
            this.bufferTools.reverse(buf);
            return buf.readDoubleBE(0);
        }
        else {
            return str.readDoubleLE(0);
        }
    };
    Binary.writeLDouble = function (value) {
        var buf = new Buffer(this.double_size);
        if (this.ENDIANNESS == this.BIG_ENDIAN) {
            buf.writeDoubleBE(value, 0);
            this.bufferTools.reverse(buf);
        }
        else {
            buf.writeDoubleLE(value, 0);
        }
        return buf;
    };
    Binary.writeLong = function (value) {
        var buf = new Buffer(this.long_size);
        buf.fill(0);
        buf.writeUInt16BE(value >> 8, 0);
        buf.writeUInt16BE(value & 0x00ff, 4);
        return buf;
    };
    Binary.readLong = function (str) {
        return (str.readUInt32BE(0) << 8) + str.readUInt32BE(4);
    };
    Binary.readLLong = function (str) {
        var buf = new Buffer(this.long_size);
        str.copy(buf);
        this.bufferTools.reverse(buf);
        return this.readLong(buf);
    };
    Binary.writeLLong = function (value) {
        var buf = new Buffer(this.long_size);
        buf.writeUInt32LE(value >> 8, 0);
        buf.writeUInt32LE(value & 0x00ff, 4);
        this.bufferTools.reverse(buf);
        return buf;
    };
    Binary.byte_size = 1;
    Binary.short_size = 2;
    Binary.int_size = 4;
    Binary.float_size = 4;
    Binary.double_size = 8;
    Binary.long_size = 8;
    Binary.os = require('os');
    Binary.bufferTools = require('buffertools');
    return Binary;
})();
exports.Binary = Binary;
