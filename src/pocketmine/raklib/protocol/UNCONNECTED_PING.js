var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../RakLib");
var UNCONNECTED_PING = (function (_super) {
    __extends(UNCONNECTED_PING, _super);
    function UNCONNECTED_PING() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(UNCONNECTED_PING, "ID", {
        get: function () {
            return 0x01;
        },
        enumerable: true,
        configurable: true
    });
    UNCONNECTED_PING.prototype.encode = function () {
        _super.prototype.encode.call(this);
        this.putLong(this.pingID);
        var buf = new Buffer(rakLib.RakLib.MAGIC);
        this.put(buf);
    };
    UNCONNECTED_PING.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.pingID = this.getLong();
    };
    return UNCONNECTED_PING;
})(protocol.Packet);
exports.UNCONNECTED_PING = UNCONNECTED_PING;
