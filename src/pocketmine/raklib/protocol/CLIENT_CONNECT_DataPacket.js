var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var CLIENT_CONNECT_DataPacket = (function (_super) {
    __extends(CLIENT_CONNECT_DataPacket, _super);
    function CLIENT_CONNECT_DataPacket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CLIENT_CONNECT_DataPacket, "ID", {
        get: function () {
            return 0x09;
        },
        enumerable: true,
        configurable: true
    });
    CLIENT_CONNECT_DataPacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
        this.putLong(this.clientID);
        this.putLong(this.session);
        this.put(new Buffer("\x00"));
    };
    CLIENT_CONNECT_DataPacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.clientID = this.getLong();
        this.session = this.getLong();
        this.unknow = this.get(1);
    };
    return CLIENT_CONNECT_DataPacket;
})(protocol.Packet);
exports.CLIENT_CONNECT_DataPacket = CLIENT_CONNECT_DataPacket;
