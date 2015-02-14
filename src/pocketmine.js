/**
 * Created by edoardo on 13/02/2015.
 */
var PocketMine;
(function (PocketMine) {
    var Level;
    (function (_Level) {
        var Level = (function () {
            function Level() {
                console.log('Level');
            }
            return Level;
        })();
        _Level.Level = Level;
    })(Level = PocketMine.Level || (PocketMine.Level = {}));
})(PocketMine || (PocketMine = {}));
/**
 * Created by edoardo on 13/02/2015.
 */
var TheMath = Math;
var PocketMine;
(function (PocketMine) {
    var Math;
    (function (Math) {
        (function (VECTOR3_SIDE) {
            VECTOR3_SIDE[VECTOR3_SIDE["DOWN"] = 0] = "DOWN";
            VECTOR3_SIDE[VECTOR3_SIDE["UP"] = 1] = "UP";
            VECTOR3_SIDE[VECTOR3_SIDE["NORTH"] = 2] = "NORTH";
            VECTOR3_SIDE[VECTOR3_SIDE["SOUTH"] = 3] = "SOUTH";
            VECTOR3_SIDE[VECTOR3_SIDE["WEST"] = 4] = "WEST";
            VECTOR3_SIDE[VECTOR3_SIDE["EAST"] = 5] = "EAST";
        })(Math.VECTOR3_SIDE || (Math.VECTOR3_SIDE = {}));
        var VECTOR3_SIDE = Math.VECTOR3_SIDE;
        var Vector3 = (function () {
            function Vector3(x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                this.$x = x;
                this.$y = y;
                this.$z = z;
            }
            Vector3.prototype.getX = function () {
                return this.$x;
            };
            Vector3.prototype.getY = function () {
                return this.$y;
            };
            Vector3.prototype.getZ = function () {
                return this.$z;
            };
            Vector3.prototype.getFloorX = function () {
                return parseInt((this.$x || 0).toString());
            };
            Vector3.prototype.getFloorY = function () {
                return parseInt((this.$y || 0).toString());
            };
            Vector3.prototype.getFloorZ = function () {
                return parseInt((this.$y || 0).toString());
            };
            Vector3.prototype.getRight = function () {
                return this.$x;
            };
            Vector3.prototype.getUp = function () {
                return this.$y;
            };
            Vector3.prototype.getForward = function () {
                return this.$z;
            };
            Vector3.prototype.getSouth = function () {
                return this.$x;
            };
            Vector3.prototype.getWest = function () {
                return this.$z;
            };
            /**
             *
             * @param x
             * @param y
             * @param z
             * @returns {Vector3}
             */
            Vector3.prototype.add = function (x, y, z) {
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                return new Vector3(this.$x + x, this.$y + y, this.$z + z);
            };
            /**
             *
             * @param x
             * @param y
             * @param z
             * @returns {Vector3}
             */
            Vector3.prototype.subtract = function (x, y, z) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                return new Vector3(this.$x - x, this.$y - y, this.$z - z);
            };
            /**
             *
             * @param n
             * @returns {Vector3}
             */
            Vector3.prototype.multiply = function (n) {
                return new Vector3(this.$x * n, this.$y * n, this.$z * n);
            };
            /**
             *
             * @param n
             */
            Vector3.prototype.divide = function (n) {
                return new Vector3(this.$x / n, this.$y / n, this.$z / n);
            };
            /**
             *
             * @returns {Vector3}
             */
            Vector3.prototype.ceil = function () {
                return new Vector3(parseInt(this.$x.toString()), parseInt(this.$y.toString()), parseInt(this.$z.toString()));
            };
            /**
             *
             * @returns {Vector3}
             */
            Vector3.prototype.floor = function () {
                return new Vector3(TheMath.floor(this.$x), TheMath.floor(this.$y), TheMath.floor(this.$z));
            };
            /**
             *
             * @returns {Vector3}
             */
            Vector3.prototype.round = function () {
                return new Vector3(TheMath.round(this.$x), TheMath.round(this.$y), TheMath.round(this.$z));
            };
            /**
             *
             * @returns {Vector3}
             */
            Vector3.prototype.abs = function () {
                return new Vector3(TheMath.abs(this.$x), TheMath.abs(this.$y), TheMath.abs(this.$z));
            };
            /**
             *
             * @param side
             * @param step
             * @returns {Vector3}
             */
            Vector3.prototype.getSide = function (side, step) {
                if (step === void 0) { step = 1; }
                switch (side) {
                    case 0 /* DOWN */:
                        return new Vector3(this.$x, this.$y - step, this.$z);
                    case 1 /* UP */:
                        return new Vector3(this.$x, this.$y + step, this.$z);
                    case 2 /* NORTH */:
                        return new Vector3(this.$x, this.$y, this.$z - step);
                    case 3 /* SOUTH */:
                        return new Vector3(this.$x, this.$y, this.$z + step);
                    case 4 /* WEST */:
                        return new Vector3(this.$x - step, this.$y, this.$z);
                    case 5 /* EAST */:
                        return new Vector3(this.$x + step, this.$y, this.$z);
                    default:
                        return this;
                }
            };
            /**
             *
             * @param side
             * @returns {number}
             */
            Vector3.getOppositeSide = function (side) {
                switch (side) {
                    case 0 /* DOWN */:
                        return 1 /* UP */;
                    case 1 /* UP */:
                        return 0 /* DOWN */;
                    case 3 /* SOUTH */:
                        return 2 /* NORTH */;
                    case 2 /* NORTH */:
                        return 3 /* SOUTH */;
                    case 4 /* WEST */:
                        return 5 /* EAST */;
                    case 5 /* EAST */:
                        return 4 /* WEST */;
                    default:
                        return -1;
                }
            };
            /**
             *
             * @param pos
             * @returns {number}
             */
            Vector3.prototype.distanceSquared = function (pos) {
                return TheMath.pow(this.$x - pos.$x, 2) + TheMath.pow(this.$y - pos.$y, 2) + TheMath.pow(this.$z - pos.$z, 2);
            };
            /**
             *
             * @param pos
             * @returns {number}
             */
            Vector3.prototype.distance = function (pos) {
                return TheMath.sqrt(this.distanceSquared(pos));
            };
            /**
             *
             * @param x
             * @param z
             * @returns {number}
             */
            Vector3.prototype.maxPlainDistance = function (x, z) {
                if (x === void 0) { x = 0; }
                if (z === void 0) { z = 0; }
                return TheMath.max(TheMath.abs(this.$x - x), TheMath.abs(this.$z - z));
            };
            /**
             *
             * @returns {number}
             */
            Vector3.prototype.length = function () {
                return TheMath.sqrt(this.lengthSquared());
            };
            /**
             *
             * @returns {number}
             */
            Vector3.prototype.lengthSquared = function () {
                return TheMath.pow(this.$x, 2) + TheMath.pow(this.$y, 2) + TheMath.pow(this.$z, 2);
            };
            /**
             *
             * @returns {Vector3}
             */
            Vector3.prototype.normalize = function () {
                var len = this.length();
                if (len != 0) {
                    return this.divide(len);
                }
                return new Vector3(0, 0, 0);
            };
            /**
             *
             * @param v
             * @returns {number}
             */
            Vector3.prototype.dot = function (v) {
                return this.$x * v.$x + this.$y * v.$y + this.$z * v.$z;
            };
            /**
             *
             * @param v
             * @returns {Vector3}
             */
            Vector3.prototype.cross = function (v) {
                return new Vector3(this.$y * v.$z - this.$z * v.$y, this.$z * v.$x - this.$x * v.$z, this.$x * v.$y - this.$y * v.$x);
            };
            /**
             * Returns a new vector with x value equal to the second parameter, along the line between this vector and the
             * passed in vector, or null if not possible.
             *
             * @param v
             * @param x
             * @returns {*}
             */
            Vector3.prototype.getIntermediateWithXValue = function (v, x) {
                var xDiff = v.$x - this.$x;
                var yDiff = v.$y - this.$y;
                var zDiff = v.$z - this.$z;
                if (TheMath.pow(xDiff, 2) < 1) {
                    return null;
                }
                var f = (x - this.$x) / xDiff;
                if (f < 0 || f > 1) {
                    return null;
                }
                else {
                    return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
                }
            };
            /**
             * Returns a new vector with y value equal to the second parameter, along the line between this vector and the
             * passed in vector, or null if not possible.
             *
             * @param v
             * @param y
             * @returns {*}
             */
            Vector3.prototype.getIntermediateWithYValue = function (v, y) {
                var xDiff = v.$x - this.$x;
                var yDiff = v.$y - this.$y;
                var zDiff = v.$z - this.$z;
                if (TheMath.pow(yDiff, 2) < 1) {
                    return null;
                }
                var f = (y - this.$y) / yDiff;
                if (f < 0 || f > 1) {
                    return null;
                }
                else {
                    return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
                }
            };
            /**
             * Returns a new vector with z value equal to the second parameter, along the line between this vector and the
             * passed in vector, or null if not possible.
             *
             * @param v
             * @param z
             * @returns {*}
             */
            Vector3.prototype.getIntermediateWithZValue = function (v, z) {
                var xDiff = v.$x - this.$x;
                var yDiff = v.$y - this.$y;
                var zDiff = v.$z - this.$z;
                if (TheMath.pow(zDiff, 2) < 1) {
                    return null;
                }
                var f = (z - this.$z) / zDiff;
                if (f < 0 || f > 1) {
                    return null;
                }
                else {
                    return new Vector3(this.$x + xDiff * f, this.$y + yDiff * f, this.$z + zDiff * f);
                }
            };
            /**
             *
             * @param x
             * @param y
             * @param z
             * @returns {Vector3}
             */
            Vector3.prototype.setComponents = function (x, y, z) {
                this.$x = x;
                this.$y = y;
                this.$z = z;
                return this;
            };
            Vector3.prototype.toString = function () {
                return ['Vector3(x=', this.$x, ',y=', this.$y, ',z=', this.$z, ')'].join();
            };
            return Vector3;
        })();
        Math.Vector3 = Vector3;
    })(Math = PocketMine.Math || (PocketMine.Math = {}));
})(PocketMine || (PocketMine = {}));
/**
 * Created by edoardo on 13/02/2015.
 */
var LevelException = (function () {
    function LevelException() {
    }
    return LevelException;
})();
/**
 * Created by edoardo on 13/02/2015.
 */
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
/// <reference path="../level/Level.ts" />
/// <reference path="../math/Vector3.ts" />
/// <reference path="../utils/LevelException.ts" />
var PocketMine;
(function (PocketMine) {
    var Level;
    (function (Level) {
        var Position = (function (_super) {
            __extends(Position, _super);
            function Position(x, y, z, level) {
                if (x === void 0) { x = 0; }
                if (y === void 0) { y = 0; }
                if (z === void 0) { z = 0; }
                if (level === void 0) { level = null; }
                _super.call(this, x, y, z);
                this.level = level;
            }
            return Position;
        })(PocketMine.Math.Vector3);
        Level.Position = Position;
    })(Level = PocketMine.Level || (PocketMine.Level = {}));
})(PocketMine || (PocketMine = {}));
/**
 * Created by edoardo on 14/02/2015.
 */
/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/misc.d.ts" />
var RakLib;
(function (RakLib) {
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
        /**
         * Reads a 3-byte big-endian number
         *
         * TODO check endianness
         * @param str
         * @returns {number}
         */
        Binary.readTriad = function (str) {
            var byte1 = str[0];
            var byte2 = str[1];
            var byte3 = str[2];
            return byte1 + (byte2 << 8) + (byte3 << 16);
        };
        /**
         * Writes a 3-byte big-endian number
         *
         * TODO impl
         * @param value
         * @returns {string}
         */
        Binary.writeTriad = function (value) {
            var buf = new Buffer(3);
            buf[2] = (value >> 16) & 0xff;
            buf[1] = (value >> 8) & 0xff;
            buf[0] = value & 0xff;
            return buf;
        };
        /**
         * Reads a 3-byte little-endian number
         *
         * TODO check endianness
         * @param str
         */
        Binary.readLTriad = function (str) {
            var byte1 = str[0];
            var byte2 = str[1];
            var byte3 = str[2];
            return byte3 + (byte2 << 8) + (byte1 << 16);
        };
        /**
         * Writes a 3-byte little-endian number
         *
         * TODO check endianness
         * @param value
         * @returns {string}
         */
        Binary.writeLTriad = function (value) {
            var buf = new Buffer(3);
            buf[0] = (value >> 16) & 0xff;
            buf[1] = (value >> 8) & 0xff;
            buf[2] = value & 0xff;
            return buf;
        };
        /**
         * Reads a byte boolean
         *
         * @param b
         * @returns {boolean}
         */
        Binary.readBool = function (b) {
            return this.readByte(b, false) === 0 ? false : true;
        };
        /**
         *
         * @param c
         * @param signed
         */
        Binary.readByte = function (c, signed) {
            if (signed === void 0) { signed = true; }
            var b = c[0];
            /**
             * TODO check
             * Orignial php code
             *
             *  if($signed){
             *      if(PHP_INT_SIZE === 8){
             *          return $b << 56 >> 56;
             *      }else{
             *          return $b << 24 >> 24;
             *      }
             *  }else{
             *      return $b;
             *  }
             */
            if (signed) {
                // TODO check
                return b << 24 >> 24;
            }
            else {
                return b;
            }
        };
        /**
         * TODO check
         * @param c
         * @returns {string}
         */
        Binary.writeByte = function (c) {
            var buf = new Buffer(this.byte_size);
            buf.writeInt8(c, buf.length);
            return buf;
        };
        /**
         * Reads a 16-bit unsigned big-endian number
         *
         * @param str
         * @returns {number}
         */
        Binary.readShort = function (str) {
            return str.readUInt16BE(0);
            //return this.bufferPack.unpack('n', str, 0)[0];
        };
        /**
         * Reads a 16-bit signed big-endian number
         *
         * @param str
         * @returns {number}
         */
        Binary.readSignedShort = function (str) {
            /**
             * Original php code
             *
             *  if(PHP_INT_SIZE === 8){
             *      return unpack("n", $str)[1] << 48 >> 48;
             *  }else{
             *      return unpack("n", $str)[1] << 16 >> 16;
             *  }
             */
            return str.readInt16BE(0) << 16 >> 16;
            //return this.bufferPack.unpack('n', str, 0)[0] << 16 >> 16;
        };
        /**
         * Writes a 16-bit signed/unsigned big-endian number
         *
         * @param v
         * @returns {string}
         */
        Binary.writeShort = function (v) {
            var buf = new Buffer(this.short_size);
            buf.writeUInt16BE(v, 0);
            return buf;
        };
        /**
         * Reads a 16-bit signed/unsigned little-endian number
         *
         * @param str
         * @param signed
         * @returns {*}
         */
        Binary.readLShort = function (str, signed) {
            if (signed === void 0) { signed = true; }
            // TODO check correct function
            var unpacked = str.readUInt16LE(0);
            //var unpacked = this.bufferPack.unpack('v', str, 0)[1];
            if (signed) {
                /**
                 * Original php code
                 *
                 *  if(PHP_INT_SIZE === 8){
                 *      return $unpacked << 48 >> 48;
                 *  }else{
                 *      return $unpacked << 16 >> 16;
                 *  }
                 */
                return unpacked << 16 >> 16;
            }
            else {
                return unpacked;
            }
        };
        /**
         * Writes a 16-bit signed/unsigned little-endian number
         * @param value
         * @returns {string}
         */
        Binary.writeLShort = function (value) {
            var buf = new Buffer(this.short_size);
            buf.writeInt16LE(value, 0);
            return buf;
            //return this.bufferPack.pack('v', value);
        };
        Binary.readInt = function (str) {
            /**
             * Original php code
             *
             *  if(PHP_INT_SIZE === 8){
             *      return unpack("N", $str)[1] << 32 >> 32;
             *  }else{
             *      return unpack("N", $str)[1];
             *  }
             */
            return str.readInt32BE(0);
            //return this.bufferPack.unpack('N', str, 0);
        };
        Binary.writeInt = function (value) {
            var buf = new Buffer(this.int_size); // TODO check correct size
            buf.writeInt32BE(value, 0);
            return buf;
            //return this.bufferPack.pack('N', value);
        };
        Binary.readLInt = function (str) {
            /**
             * Original php code
             *
             *  if(PHP_INT_SIZE === 8){
             *      return unpack("V", $str)[1] << 32 >> 32;
             *  }else{
             *      return unpack("V", $str)[1];
             *  }
             */
            return str.readInt32LE(0);
            //return this.bufferPack.unpack('V', str, 0)[1];
        };
        Binary.writeLInt = function (value) {
            var buf = new Buffer(this.int_size);
            buf.writeInt32LE(value, 0);
            return buf;
            //return this.bufferPack.pack('V', value);
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
            buf.writeUInt32LE(value >> 8, 0); //write the high order bits (shifted over)
            buf.writeUInt32LE(value & 0x00ff, 4); //write the low order bits
            this.bufferTools.reverse(buf);
            return buf;
        };
        Binary.byte_size = 1;
        Binary.short_size = 2;
        Binary.int_size = 4;
        Binary.float_size = 4;
        Binary.double_size = 8;
        Binary.long_size = 8;
        Binary.bufferPack = require('bufferpack');
        Binary.os = require('os');
        Binary.bufferTools = require('buffertools');
        return Binary;
    })();
    RakLib.Binary = Binary;
})(RakLib || (RakLib = {}));
/**
 * Created by edoardo on 13/02/2015.
 */
/// <reference path="level/Position.ts" />
/// <reference path="raklib/Binary.ts" />
var position = new PocketMine.Level.Position(10, 15, 20);
console.log(position.$x, position.$y, position.$z);
console.log(RakLib.Binary.BIG_ENDIAN);
console.log(RakLib.Binary.LITTLE_ENDIAN);
console.log('======');
/*
var b = 'abcd';
var bInt = RakLib.Binary.readInt(b);
console.log('Readed int: ', bInt);
console.log('Writed int: ', RakLib.Binary.writeInt(bInt));
*/
var bufferPack = require('bufferpack');
var b = bufferPack.pack('H', [2000]);
var bt = bufferPack.unpack('H', b, 0);
console.log('Packed: ', b);
console.log('Unpacked: ', bt);
