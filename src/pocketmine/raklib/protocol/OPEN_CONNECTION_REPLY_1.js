var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
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
    return OPEN_CONNECTION_REPLY_1;
})(protocol.Packet);
exports.OPEN_CONNECTION_REPLY_1 = OPEN_CONNECTION_REPLY_1;
