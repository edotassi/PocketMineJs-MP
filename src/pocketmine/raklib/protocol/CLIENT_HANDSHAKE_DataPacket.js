var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var CLIENT_HANDSHAKE_DataPacket = (function (_super) {
    __extends(CLIENT_HANDSHAKE_DataPacket, _super);
    function CLIENT_HANDSHAKE_DataPacket() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(CLIENT_HANDSHAKE_DataPacket, "ID", {
        get: function () {
            return 0x13;
        },
        enumerable: true,
        configurable: true
    });
    CLIENT_HANDSHAKE_DataPacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
    };
    CLIENT_HANDSHAKE_DataPacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.cookie = this.get(4).toString('utf8');
        this.security = this.get(1).toString('utf8');
        this.port = this.getShort(false);
        this.dataArray0 = this.get(this.getByte());
        this.dataArray = this.getDataArray(9);
        this.timestamp = this.get(2).toString("utf8");
        this.session2 = this.getLong(false);
        this.session = this.getLong(false);
    };
    CLIENT_HANDSHAKE_DataPacket.prototype.getDataArray = function (len) {
        if (len === void 0) { len = 10; }
        var data = [];
        for (var i = 1; i < len && !this.feof(); ++i) {
            data.push(this.get(this.getTriad()));
        }
        return data;
    };
    return CLIENT_HANDSHAKE_DataPacket;
})(protocol.Packet);
exports.CLIENT_HANDSHAKE_DataPacket = CLIENT_HANDSHAKE_DataPacket;
