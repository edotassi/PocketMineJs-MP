/**
 * Created by edoardo on 16/02/2015.
 */
var RakLib;
(function (_RakLib) {
    var RakLib = (function () {
        function RakLib() {
        }
        Object.defineProperty(RakLib, "PACKET_ENCAPSULATED", {
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
            get: function () {
                return 0x01;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_OPEN_SESSION", {
            /**
             * OPEN_SESSION payload:
             * byte (identifier length)
             * byte[] (identifier)
             * byte (address length)
             * byte[] (address)
             * short (port)
             * long (clientID)
             */
            get: function () {
                return 0x02;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_CLOSE_SESSION", {
            /**
             * CLOSE_SESSION payload:
             * byte (identifier length)
             * byte[] (identifier)
             * string (reason)
             */
            get: function () {
                return 0x03;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_INVALID_SESSION", {
            /**
             * INVALID_SESSION payload:
             * byte (identifier length)
             * byte[] (identifier)
             */
            get: function () {
                return 0x04;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_SEND_QUEUE", {
            /**
             * TODO: implement this
             * SEND_QUEUE payload:
             * byte (identifier length)
             * byte[] (identifier)
             */
            get: function () {
                return 0x05;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_ACK_NOTIFICATION", {
            /**
             * ACK_NOTIFICATION payload:
             * byte (identifier length)
             * byte[] (identifier)
             * int (identifierACK)
             */
            get: function () {
                return 0x06;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_SET_OPTION", {
            /**
             * SET_OPTION payload:
             * byte (option name length)
             * byte[] (option name)
             * byte[] (option value)
             */
            get: function () {
                return 0x07;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_RAW", {
            /**
             * RAW payload:
             * byte (address length)
             * byte[] (address from/to)
             * short (port)
             * byte[] (payload)
             */
            get: function () {
                return 0x08;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_TICK", {
            /**
             * No payload
             */
            get: function () {
                return 0x09;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_BLOCK_ADDRESS", {
            /**
             * RAW payload:
             * byte (address length)
             * byte[] (address)
             * int (timeout)
             */
            get: function () {
                return 0x0a;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_SHUTDOWN", {
            /**
             * No payload
             *
             * Sends the disconnect message, removes sessions correctly, closes sockets.
             */
            get: function () {
                return 0x7e;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RakLib, "PACKET_EMERGENCY_SHUTDOWN", {
            /**
             * No payload
             *
             * Leaves everything as-is and halts, other Threads can be in a post-crash condition.
             */
            get: function () {
                return 0x7f;
            },
            enumerable: true,
            configurable: true
        });
        RakLib.VERSION = '0.7.0'; // TODO wich version?
        RakLib.PROTOCOL = 5;
        RakLib.MAGIC = "\x00\xff\xff\x00\xfe\xfe\xfe\xfe\xfd\xfd\xfd\xfd\x12\x34\x56\x78";
        RakLib.PRIORITY_NORMAL = 0;
        RakLib.PRIORITY_IMMEDIATE = 1;
        RakLib.FLAG_NEED_ACK = 0x08;
        return RakLib;
    })();
    _RakLib.RakLib = RakLib;
})(RakLib || (RakLib = {}));
