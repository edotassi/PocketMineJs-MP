var RakLib = (function () {
    function RakLib() {
    }
    Object.defineProperty(RakLib, "PACKET_ENCAPSULATED", {
        get: function () {
            return 0x01;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_OPEN_SESSION", {
        get: function () {
            return 0x02;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_CLOSE_SESSION", {
        get: function () {
            return 0x03;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_INVALID_SESSION", {
        get: function () {
            return 0x04;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_SEND_QUEUE", {
        get: function () {
            return 0x05;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_ACK_NOTIFICATION", {
        get: function () {
            return 0x06;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_SET_OPTION", {
        get: function () {
            return 0x07;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_RAW", {
        get: function () {
            return 0x08;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_TICK", {
        get: function () {
            return 0x09;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_BLOCK_ADDRESS", {
        get: function () {
            return 0x0a;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_SHUTDOWN", {
        get: function () {
            return 0x7e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(RakLib, "PACKET_EMERGENCY_SHUTDOWN", {
        get: function () {
            return 0x7f;
        },
        enumerable: true,
        configurable: true
    });
    RakLib.VERSION = '0.7.0';
    RakLib.PROTOCOL = 5;
    RakLib.MAGIC = "\x00\xff\xff\x00\xfe\xfe\xfe\xfe\xfd\xfd\xfd\xfd\x12\x34\x56\x78";
    RakLib.PRIORITY_NORMAL = 0;
    RakLib.PRIORITY_IMMEDIATE = 1;
    RakLib.FLAG_NEED_ACK = 0x08;
    return RakLib;
})();
exports.RakLib = RakLib;
