
import protocol = require("Packet");
import rakLib = require("../Binary");

export class AcknowledgePacket extends protocol.Packet {
    public packets: Array<number>;

    public encode(): void {
        super.encode();
        var payload = "";
        this.packets.sort();
        var count: number = this.packets.length;
        var records: number = 0;

        if (count > 0) {
            var pointer = 1;
            var start = this.packets[0];
            var last = this.packets[0];

            while (pointer < count) {
                var current = this.packets[pointer++];
                var diff = current - last;
                if (diff === 1) {
                    last = current;
                } else {
                    if (diff > 1) {
                        if (start == last) {
                            payload += "\x01";
                            payload += rakLib.Binary.writeLTriad(start);
                            start = last = current;
                        } else {
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
            } else {
                payload += "\x00";
                payload += rakLib.Binary.writeLTriad(start);
                payload += rakLib.Binary.writeLTriad(last);
            }
            ++records;
        }

        this.putShort(records);
        this.buffer = Buffer.concat([this.buffer, new Buffer(payload)]);
    }

    public decode(): void {
        super.decode();
        var count:number = this.getShort(false);
        this.packets = [];
        var cnt: number = 0;
        for (var i = 0; i < count && !this.feof() && cnt < 4096; i++) {
            if (this.getByte() === 0) {
                var start: number = this.getLTriad();
                var end: number = this.getLTriad();
                if ((end - start) > 512) {
                    end = start + 512;
                }
                for (var c = start; c <= end; ++c) {
                    this.packets[cnt++] = c;
                }
            } else {
                this.packets[cnt++] = this.getLTriad();
            }
        }
    }

    public clean(): protocol.Packet {
        this.packets = [];
        return super.clean();
    }
}