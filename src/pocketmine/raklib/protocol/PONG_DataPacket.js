var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var PONG_DataPacket = (function (_super) {
    __extends(PONG_DataPacket, _super);
    function PONG_DataPacket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(PONG_DataPacket, "ID", {
        get: function () {
            return 0x00;
        },
        enumerable: true,
        configurable: true
    });
    return PONG_DataPacket;
})(protocol.Packet);
exports.PONG_DataPacket = PONG_DataPacket;
