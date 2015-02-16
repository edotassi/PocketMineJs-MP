/**
 * Created by edoardo on 16/02/2015.
 */

module RakLib {
    export class RakLib {
        public static VERSION:string = '0.7.0'; // TODO wich version?
        public static PROTOCOL:number = 5;
        public static MAGIC:string = "\x00\xff\xff\x00\xfe\xfe\xfe\xfe\xfd\xfd\xfd\xfd\x12\x34\x56\x78";
        public static PRIORITY_NORMAL:number = 0;
        public static PRIORITY_IMMEDIATE:number = 1;
        public static FLAG_NEED_ACK:number = 0x08;

        /**
         * Internal Packet:
         * int32 (length without this field)
         * byte (packet ID)
         * payload
         */

        /**
         * ENCAPSULATED payload:
         * byte (identifier length)
         * byte[] (identifier)
         * byte (flags, last 3 bits, priority)
         * payload (binary internal EncapsulatedPacket)
         */
        public static get PACKET_ENCAPSULATED():number {
            return 0x01;
        }

        /**
         * OPEN_SESSION payload:
         * byte (identifier length)
         * byte[] (identifier)
         * byte (address length)
         * byte[] (address)
         * short (port)
         * long (clientID)
         */
        public static get PACKET_OPEN_SESSION():number {
            return 0x02;
        }

        /**
         * CLOSE_SESSION payload:
         * byte (identifier length)
         * byte[] (identifier)
         * string (reason)
         */
        public static get PACKET_CLOSE_SESSION():number {
            return 0x03;
        }

        /**
         * INVALID_SESSION payload:
         * byte (identifier length)
         * byte[] (identifier)
         */
        public static get PACKET_INVALID_SESSION():number {
            return 0x04;
        }

        /**
         * TODO: implement this
         * SEND_QUEUE payload:
         * byte (identifier length)
         * byte[] (identifier)
         */
        public static get PACKET_SEND_QUEUE():number {
            return 0x05;
        }

        /**
         * ACK_NOTIFICATION payload:
         * byte (identifier length)
         * byte[] (identifier)
         * int (identifierACK)
         */
        public static get PACKET_ACK_NOTIFICATION():number {
            return 0x06;
        }

        /**
         * SET_OPTION payload:
         * byte (option name length)
         * byte[] (option name)
         * byte[] (option value)
         */
        public static get PACKET_SET_OPTION():number {
            return 0x07;
        }

        /**
         * RAW payload:
         * byte (address length)
         * byte[] (address from/to)
         * short (port)
         * byte[] (payload)
         */
        public static get PACKET_RAW():number {
            return 0x08;
        }

        /**
         * No payload
         */
        public static get PACKET_TICK():number {
            return 0x09;
        }

        /**
         * RAW payload:
         * byte (address length)
         * byte[] (address)
         * int (timeout)
         */
        public static get PACKET_BLOCK_ADDRESS():number {
            return 0x0a;
        }

        /**
         * No payload
         *
         * Sends the disconnect message, removes sessions correctly, closes sockets.
         */
        public static get PACKET_SHUTDOWN():number {
            return 0x7e;
        }

        /**
         * No payload
         *
         * Leaves everything as-is and halts, other Threads can be in a post-crash condition.
         */
        public static get PACKET_EMERGENCY_SHUTDOWN():number {
            return 0x7f;
        }
    }
}
