var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("DataPacket");
var DATA_PACKET_0 = (function (_super) {
    __extends(DATA_PACKET_0, _super);
    function DATA_PACKET_0() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(DATA_PACKET_0, "ID", {
        get: function () {
            return 0x80;
        },
        enumerable: true,
        configurable: true
    });
    return DATA_PACKET_0;
})(protocol.DataPacket);
exports.DATA_PACKET_0 = DATA_PACKET_0;
