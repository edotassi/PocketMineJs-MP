var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var CLIENT_DISCONNECT_DataPacket = (function (_super) {
    __extends(CLIENT_DISCONNECT_DataPacket, _super);
    function CLIENT_DISCONNECT_DataPacket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CLIENT_DISCONNECT_DataPacket, "ID", {
        get: function () {
            return 0x15;
        },
        enumerable: true,
        configurable: true
    });
    CLIENT_DISCONNECT_DataPacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
    };
    CLIENT_DISCONNECT_DataPacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
    };
    return CLIENT_DISCONNECT_DataPacket;
})(protocol.Packet);
exports.CLIENT_DISCONNECT_DataPacket = CLIENT_DISCONNECT_DataPacket;
