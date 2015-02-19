var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../RakLib");
var OPEN_CONNECTION_REQUEST_1 = (function (_super) {
    __extends(OPEN_CONNECTION_REQUEST_1, _super);
    function OPEN_CONNECTION_REQUEST_1() {
        _super.apply(this, arguments);
        this.protocol = rakLib.RakLib.PROTOCOL;
    }
    Object.defineProperty(OPEN_CONNECTION_REQUEST_1, "ID", {
        get: function () {
            return 0x05;
        },
        enumerable: true,
        configurable: true
    });
    OPEN_CONNECTION_REQUEST_1.prototype.encode = function () {
        _super.prototype.encode.call(this);
        var buf = new Buffer(rakLib.RakLib.MAGIC);
        this.put(buf);
        this.putByte(this.protocol);
        var mtuRepeat = new Array(this.mtuSize - 17).join('\x00');
        var bufMtuRepeat = new Buffer(mtuRepeat);
        this.put(bufMtuRepeat);
    };
    OPEN_CONNECTION_REQUEST_1.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.offset += 16;
        this.protocol = this.getByte();
        this.mtuSize = this.getAll().length - 18;
    };
    return OPEN_CONNECTION_REQUEST_1;
})(protocol.Packet);
exports.OPEN_CONNECTION_REQUEST_1 = OPEN_CONNECTION_REQUEST_1;
