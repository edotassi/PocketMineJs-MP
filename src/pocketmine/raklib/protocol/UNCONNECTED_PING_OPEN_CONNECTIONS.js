var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("UNCONNECTED_PING");
var UNCONNECTED_PING_OPEN_CONNECTIONS = (function (_super) {
    __extends(UNCONNECTED_PING_OPEN_CONNECTIONS, _super);
    function UNCONNECTED_PING_OPEN_CONNECTIONS() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(UNCONNECTED_PING_OPEN_CONNECTIONS, "ID", {
        get: function () {
            return 0x02;
        },
        enumerable: true,
        configurable: true
    });
    return UNCONNECTED_PING_OPEN_CONNECTIONS;
})(protocol.UNCONNECTED_PING);
exports.UNCONNECTED_PING_OPEN_CONNECTIONS = UNCONNECTED_PING_OPEN_CONNECTIONS;
