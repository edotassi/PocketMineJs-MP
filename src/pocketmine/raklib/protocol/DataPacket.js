var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var packet = require("Packet");
var protocol = require("EncapsulatedPacket");
var DataPacket = (function (_super) {
    __extends(DataPacket, _super);
    function DataPacket() {
        _super.apply(this, arguments);
        this.packets = [];
    }
    DataPacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
        this.putLTriad(this.seqNumber);
        for (var i = 0; i < this.packets.length; i++) {
            var packet = this.packets[i];
            this.put(packet.toBinary());
        }
    };
    DataPacket.prototype.length = function () {
        var len = 4;
        for (var i = 0; i < this.packets.length; i++) {
            var packet = this.packets[i];
            len += packet.getTotalLength();
        }
        return len;
    };
    DataPacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
        this.seqNumber = this.getLTriad();
        while (!this.feof()) {
            var offset = 0;
            var bufPacket = new Buffer(this.buffer.length - this.offset);
            this.buffer.copy(bufPacket, 0, this.offset);
            var packet = protocol.EncapulatedPacket.fromBinary(bufPacket, function (resultOffset) {
                offset = resultOffset;
            }, false, offset);
            this.offset += offset;
            if (packet.buffer.length === 0) {
                break;
            }
            this.packets.push(packet);
        }
    };
    DataPacket.prototype.clean = function () {
        this.packets = [];
        this.seqNumber = null;
        return _super.prototype.clean.call(this);
    };
    return DataPacket;
})(packet.Packet);
exports.DataPacket = DataPacket;
