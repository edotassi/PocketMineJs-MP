var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var SERVER_HANDSHAKE_DataPacket = (function (_super) {
    __extends(SERVER_HANDSHAKE_DataPacket, _super);
    function SERVER_HANDSHAKE_DataPacket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(SERVER_HANDSHAKE_DataPacket, "ID", {
        get: function () {
            return 0x10;
        },
        enumerable: true,
        configurable: true
    });
    SERVER_HANDSHAKE_DataPacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
        var bufCookie = new Buffer("\x04\x3f\x57\xfe");
        var bufSecurityFlags = new Buffer("\xcd");
        var bufZero = new Buffer("\x00\x00");
        this.put(bufCookie);
        this.put(bufSecurityFlags);
        this.putShort(this.port);
        this.putDataArray([
            "\xf5\xff\xff\xf5",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
        ]);
        this.put(bufZero);
        this.putLong(this.session);
        this.putLong(this.session2);
    };
    SERVER_HANDSHAKE_DataPacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
    };
    SERVER_HANDSHAKE_DataPacket.prototype.putDataArray = function (data) {
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var buf = new Buffer(row);
            this.putTriad(buf.length);
            this.put(buf);
        }
    };
    return SERVER_HANDSHAKE_DataPacket;
})(protocol.Packet);
exports.SERVER_HANDSHAKE_DataPacket = SERVER_HANDSHAKE_DataPacket;
