var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../RakLib");
var OPEN_CONNECTION_REPLY_2 = (function (_super) {
    __extends(OPEN_CONNECTION_REPLY_2, _super);
    function OPEN_CONNECTION_REPLY_2() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(OPEN_CONNECTION_REPLY_2, "ID", {
        get: function () {
            return 0x08;
        },
        enumerable: true,
        configurable: true
    });
    OPEN_CONNECTION_REPLY_2.prototype.encode = function () {
        _super.prototype.encode.call(this);
        var bufMagic = new Buffer(rakLib.RakLib.MAGIC);
        this.put(bufMagic);
        this.putLong(this.serverID);
        this.putShort(this.clientPort);
        this.putShort(this.mtuSize);
        this.putByte(0);
    };
    OPEN_CONNECTION_REPLY_2.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.offset += 16;
        this.serverID = this.getLong();
        this.clientPort = this.getShort(false);
        this.mtuSize = this.getShort(false);
    };
    return OPEN_CONNECTION_REPLY_2;
})(protocol.Packet);
exports.OPEN_CONNECTION_REPLY_2 = OPEN_CONNECTION_REPLY_2;
