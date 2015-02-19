var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../RakLib");
var OPEN_CONNECTION_REPLY_1 = (function (_super) {
    __extends(OPEN_CONNECTION_REPLY_1, _super);
    function OPEN_CONNECTION_REPLY_1() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(OPEN_CONNECTION_REPLY_1, "ID", {
        get: function () {
            return 0x06;
        },
        enumerable: true,
        configurable: true
    });
    OPEN_CONNECTION_REPLY_1.prototype.encode = function () {
        _super.prototype.encode.call(this);
        var bufMagic = new Buffer(rakLib.RakLib.MAGIC);
        this.put(bufMagic);
        this.putLong(this.serverID);
        this.putByte(0);
        this.putShort(this.mtuSize);
    };
    OPEN_CONNECTION_REPLY_1.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.offset += 16;
        this.serverID = this.getLong();
        this.getByte();
        this.mtuSize = this.getByte();
    };
    return OPEN_CONNECTION_REPLY_1;
})(protocol.Packet);
exports.OPEN_CONNECTION_REPLY_1 = OPEN_CONNECTION_REPLY_1;
