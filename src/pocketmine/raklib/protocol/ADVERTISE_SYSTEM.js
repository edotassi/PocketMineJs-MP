var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("UNCONNECTED_PONG");
var ADVERTISE_SYSTEM = (function (_super) {
    __extends(ADVERTISE_SYSTEM, _super);
    function ADVERTISE_SYSTEM() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(ADVERTISE_SYSTEM, "ID", {
        get: function () {
            return 0x1d;
        },
        enumerable: true,
        configurable: true
    });
    return ADVERTISE_SYSTEM;
})(protocol.UNCONNECTED_PONG);
exports.ADVERTISE_SYSTEM = ADVERTISE_SYSTEM;
