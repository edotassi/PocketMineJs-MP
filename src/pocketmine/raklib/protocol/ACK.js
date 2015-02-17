var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("AcknowledgePacket");
var ACK = (function (_super) {
    __extends(ACK, _super);
    function ACK() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ACK, "ID", {
        get: function () {
            return 0xc0;
        },
        enumerable: true,
        configurable: true
    });
    return ACK;
})(protocol.AcknowledgePacket);
exports.ACK = ACK;
