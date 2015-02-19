var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("AcknowledgePacket");
var NACK = (function (_super) {
    __extends(NACK, _super);
    function NACK() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(NACK, "ID", {
        get: function () {
            return 0xa0;
        },
        enumerable: true,
        configurable: true
    });
    return NACK;
})(protocol.AcknowledgePacket);
exports.NACK = NACK;
