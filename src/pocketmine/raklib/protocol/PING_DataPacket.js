var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var PING_DataPacket = (function (_super) {
    __extends(PING_DataPacket, _super);
    function PING_DataPacket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PING_DataPacket, "ID", {
        get: function () {
            return 0x00;
        },
        enumerable: true,
        configurable: true
    });
    PING_DataPacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
        this.putLong(this.pingID);
    };
    PING_DataPacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.pingID = this.getLong();
    };
    return PING_DataPacket;
})(protocol.Packet);
exports.PING_DataPacket = PING_DataPacket;
