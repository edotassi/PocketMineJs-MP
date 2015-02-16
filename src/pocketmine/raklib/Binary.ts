/**
 * Created by edoardo on 14/02/2015.
 */

/// <reference path="../../typings/node/node.d.ts" />
/// <reference path="../../typings/misc.d.ts" />

module RakLib {
    export class Binary {

        private static byte_size:number = 1;
        private static short_size:number = 2;
        private static int_size:number = 4;
        private static float_size:number = 4;
        private static double_size:number = 8;
        private static long_size:number = 8;

        public static get BIG_ENDIAN():number {
            return 0x00;
        }

        public static get LITTLE_ENDIAN():number {
            return 0x01;
        }

        public static get ENDIANNESS():number {
            return this.os.endianness() == 'BE' ? this.BIG_ENDIAN : this.LITTLE_ENDIAN;
        }

        private static os = require('os');
        private static bufferTools = require('buffertools');

        /**
         * Reads a 3-byte big-endian number
         *
         * TODO check endianness
         * @param str
         * @returns {number}
         */
        public static readTriad(str:Buffer):number {
            var byte1 = str[0];
            var byte2 = str[1];
            var byte3 = str[2];

            return byte1 + (byte2 << 8) + (byte3 << 16);
        }

        /**
         * Writes a 3-byte big-endian number
         *
         * TODO impl
         * @param value
         * @returns {string}
         */
        public static writeTriad(value:number):Buffer {
            var buf = new Buffer(3);

            buf[2] = (value >> 16) & 0xff;
            buf[1] = (value >> 8) & 0xff;
            buf[0] = value & 0xff;

            return buf;
        }

        /**
         * Reads a 3-byte little-endian number
         *
         * TODO check endianness
         * @param str
         */
        public static readLTriad(str:Buffer):number {
            var byte1 = str[0];
            var byte2 = str[1];
            var byte3 = str[2];

            return byte3 + (byte2 << 8) + (byte1 << 16);
        }

        /**
         * Writes a 3-byte little-endian number
         *
         * TODO check endianness
         * @param value
         * @returns {string}
         */
        public static writeLTriad(value:number):Buffer {
            var buf = new Buffer(3);

            buf[0] = (value >> 16) & 0xff;
            buf[1] = (value >> 8) & 0xff;
            buf[2] = value & 0xff;

            return buf;
        }

        /**
         * Reads a byte boolean
         *
         * @param b
         * @returns {boolean}
         */
        public static readBool(b:Buffer):boolean {
            return this.readByte(b, false) === 0 ? false : true;
        }

        /**
         *
         * @param c
         * @param signed
         */
        public static readByte(c:Buffer, signed:boolean = true):number {
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
            } else {
                return b;
            }
        }

        /**
         * TODO check
         * @param c
         * @returns {string}
         */
        public static writeByte(c:number):Buffer {
            var buf = new Buffer(this.byte_size);
            buf.writeInt8(c, buf.length);
            return buf;
        }

        /**
         * Reads a 16-bit unsigned big-endian number
         *
         * @param str
         * @returns {number}
         */
        public static readShort(str:Buffer):number {
            return str.readUInt16BE(0);
            //return this.bufferPack.unpack('n', str, 0)[0];
        }

        /**
         * Reads a 16-bit signed big-endian number
         *
         * @param str
         * @returns {number}
         */
        public static readSignedShort(str:Buffer):number {
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
        }

        /**
         * Writes a 16-bit signed/unsigned big-endian number
         *
         * @param v
         * @returns {string}
         */
        public static writeShort(v:number):Buffer {
            var buf = new Buffer(this.short_size);
            buf.writeUInt16BE(v, 0);
            return buf;
        }

        /**
         * Reads a 16-bit signed/unsigned little-endian number
         *
         * @param str
         * @param signed
         * @returns {*}
         */
        public static readLShort(str:Buffer, signed:boolean = true):number {

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
            } else {
                return unpacked;
            }
        }

        /**
         * Writes a 16-bit signed/unsigned little-endian number
         * @param value
         * @returns {string}
         */
        public static writeLShort(value:number):Buffer {
            var buf = new Buffer(this.short_size);
            buf.writeInt16LE(value, 0);
            return buf;
            //return this.bufferPack.pack('v', value);
        }

        public static readInt(str:Buffer):number {
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
        }

        public static writeInt(value:number):Buffer {
            var buf = new Buffer(this.int_size); // TODO check correct size
            buf.writeInt32BE(value, 0);
            return buf;
            //return this.bufferPack.pack('N', value);
        }

        public static readLInt(str:Buffer):number {
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
        }

        public static writeLInt(value:number):Buffer {
            var buf = new Buffer(this.int_size);
            buf.writeInt32LE(value, 0);
            return buf;
            //return this.bufferPack.pack('V', value);
        }

        public static readFloat(str:Buffer):number {
            return this.ENDIANNESS == this.BIG_ENDIAN ?
                str.readFloatBE(0) :
                str.readFloatLE(0);
        }

        public static writeFloat(value:number):Buffer {
            var buf = new Buffer(this.float_size);
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                buf.writeFloatBE(value, 0);
            } else {
                buf.writeFloatLE(value, 0);
            }

            return buf;
        }

        public static readLFloat(str:Buffer):number {
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                var buf = new Buffer(this.float_size);
                str.copy(buf);
                this.bufferTools.reverse(buf);
                return buf.readFloatBE(0);
            } else {
                return str.readFloatLE(0);
            }
        }

        public static writeLFloat(value:number):Buffer {
            var buf = new Buffer(this.float_size);
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                buf.writeFloatBE(value, 0);
                this.bufferTools.reverse(buf);
            } else {
                buf.writeFloatLE(value, 0);
            }
            return buf;
        }

        public static readDouble(str:Buffer):number {
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                return str.readDoubleBE(0);
            } else {
                var buf = new Buffer(this.double_size);
                str.copy(buf);
                return str.readDoubleLE(0);
            }
        }

        public static writeDouble(value:number):Buffer {
            var buf = new Buffer(this.double_size);
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                buf.writeDoubleBE(value, 0);
            } else {
                buf.writeDoubleLE(value, 0);
                this.bufferTools.reverse(buf);
            }
            return buf;
        }

        public static readLDouble(str:Buffer):number {
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                var buf = new Buffer(this.double_size);
                str.copy(buf);
                this.bufferTools.reverse(buf);
                return buf.readDoubleBE(0);
            } else {
                return str.readDoubleLE(0);
            }
        }

        public static writeLDouble(value:number):Buffer {
            var buf = new Buffer(this.double_size);
            if (this.ENDIANNESS == this.BIG_ENDIAN) {
                buf.writeDoubleBE(value, 0);
                this.bufferTools.reverse(buf);
            } else {
                buf.writeDoubleLE(value, 0);
            }
            return buf;
        }

        public static writeLong(value:number):Buffer {
            var buf = new Buffer(this.long_size);
            buf.fill(0);
            buf.writeUInt16BE(value >> 8, 0);
            buf.writeUInt16BE(value & 0x00ff, 4);
            return buf;
        }

        public static readLong(str:Buffer):number {
            return (str.readUInt32BE(0) << 8) + str.readUInt32BE(4);
        }

        public static readLLong(str:Buffer):number {
            var buf = new Buffer(this.long_size);
            str.copy(buf);
            this.bufferTools.reverse(buf);
            return this.readLong(buf);
        }

        public static writeLLong(value:number):Buffer {
            var buf = new Buffer(this.long_size);
            buf.writeUInt32LE(value >> 8, 0); //write the high order bits (shifted over)
            buf.writeUInt32LE(value & 0x00ff, 4); //write the low order bits
            this.bufferTools.reverse(buf);
            return buf;
        }
    }
}