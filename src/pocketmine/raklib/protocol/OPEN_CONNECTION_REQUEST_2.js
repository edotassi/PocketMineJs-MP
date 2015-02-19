var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../RakLib");
var OPEN_CONNECTION_REQUEST_2 = (function (_super) {
    __extends(OPEN_CONNECTION_REQUEST_2, _super);
    function OPEN_CONNECTION_REQUEST_2() {
        _super.apply(this, arguments);
    }
    Object.defineProperty(OPEN_CONNECTION_REQUEST_2, "ID", {
        get: function () {
            return 0x07;
        },
        enumerable: true,
        configurable: true
    });
    OPEN_CONNECTION_REQUEST_2.prototype.encode = function () {
        _super.prototype.encode.call(this);
        var buf = new Buffer(rakLib.RakLib.MAGIC);
        this.put(buf);
        this.put(new Buffer("\x00"));
        this.putShort(this.serverPort);
        this.putShort(this.mtuSize);
        this.putLong(this.clientID);
    };
    OPEN_CONNECTION_REQUEST_2.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.offset += 16;
        this.get(5);
        this.serverPort = this.getShort(false);
        this.mtuSize = this.getShort(false);
        this.clientID = this.getLong();
    };
    return OPEN_CONNECTION_REQUEST_2;
})(protocol.Packet);
exports.OPEN_CONNECTION_REQUEST_2 = OPEN_CONNECTION_REQUEST_2;
