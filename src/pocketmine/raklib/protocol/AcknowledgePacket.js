var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var protocol = require("Packet");
var rakLib = require("../Binary");
var AcknowledgePacket = (function (_super) {
    __extends(AcknowledgePacket, _super);
    function AcknowledgePacket() {
        _super.apply(this, arguments);
    }
    AcknowledgePacket.prototype.encode = function () {
        _super.prototype.encode.call(this);
        var payload = "";
        this.packets.sort();
        var count = this.packets.length;
        var records = 0;
        if (count > 0) {
            var pointer = 1;
            var start = this.packets[0];
            var last = this.packets[0];
            while (pointer < count) {
                var current = this.packets[pointer++];
                var diff = current - last;
                if (diff === 1) {
                    last = current;
                }
                else {
                    if (diff > 1) {
                        if (start == last) {
                            payload += "\x01";
                            payload += rakLib.Binary.writeLTriad(start);
                            start = last = current;
                        }
                        else {
                            payload += "\x00";
                            payload += rakLib.Binary.writeLTriad(start);
                            payload += rakLib.Binary.writeLTriad(last);
                            start = last = current;
                        }
                        ++records;
                    }
                }
            }
            if (start === last) {
                payload += "\x01";
                payload += rakLib.Binary.writeLTriad(start);
            }
            else {
                payload += "\x00";
                payload += rakLib.Binary.writeLTriad(start);
                payload += rakLib.Binary.writeLTriad(last);
            }
            ++records;
        }
        this.putShort(records);
        this.buffer = Buffer.concat([this.buffer, new Buffer(payload)]);
    };
    AcknowledgePacket.prototype.decode = function () {
        _super.prototype.decode.call(this);
        var count = this.getShort(false);
        this.packets = [];
        var cnt = 0;
        for (var i = 0; i < count && !this.feof() && cnt < 4096; i++) {
            if (this.getByte() === 0) {
                var start = this.getLTriad();
                var end = this.getLTriad();
                if ((end - start) > 512) {
                    end = start + 512;
                }
                for (var c = start; c <= end; ++c) {
                    this.packets[cnt++] = c;
                }
            }
            else {
                this.packets[cnt++] = this.getLTriad();
            }
        }
    };
    AcknowledgePacket.prototype.clean = function () {
        this.packets = [];
        return _super.prototype.clean.call(this);
    };
    return AcknowledgePacket;
})(protocol.Packet);
exports.AcknowledgePacket = AcknowledgePacket;
