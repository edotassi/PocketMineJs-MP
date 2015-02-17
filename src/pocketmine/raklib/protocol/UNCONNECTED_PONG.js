var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../RakLib");
var UNCONNECTED_PONG = (function (_super) {
    __extends(UNCONNECTED_PONG, _super);
    function UNCONNECTED_PONG() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(UNCONNECTED_PONG, "ID", {
        get: function () {
            return 0x1c;
        },
        enumerable: true,
        configurable: true
    });
    UNCONNECTED_PONG.prototype.encode = function () {
        _super.prototype.encode.call(this);
        this.putLong(this.pingID);
        this.putLong(this.serverID);
        this.put(new Buffer(rakLib.RakLib.MAGIC));
        this.putString(this.serverName);
    };
    UNCONNECTED_PONG.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.pingID = this.getLong(false);
        this.serverID = this.getLong(false);
        this.offset += 16;
        this.serverName = this.getString();
    };
    return UNCONNECTED_PONG;
})(protocol.Packet);
exports.UNCONNECTED_PONG = UNCONNECTED_PONG;
