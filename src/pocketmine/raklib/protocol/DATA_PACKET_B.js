var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("DataPacket");
var DATA_PACKET_B = (function (_super) {
    __extends(DATA_PACKET_B, _super);
    function DATA_PACKET_B() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DATA_PACKET_B, "ID", {
        get: function () {
            return 0x8B;
        },
        enumerable: true,
        configurable: true
    });
    return DATA_PACKET_B;
})(protocol.DataPacket);
exports.DATA_PACKET_B = DATA_PACKET_B;
