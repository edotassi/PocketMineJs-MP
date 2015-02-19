
import protocol = require("Packet");

export class SERVER_HANDSHAKE_DataPacket extends protocol.Packet {
    public static get ID(): number {
        return 0x10;
    }

    public port: number;
    public session: number;
    public session2: number;

    public encode(): void {
        super.encode();

        var bufCookie = new Buffer("\x04\x3f\x57\xfe");
        var bufSecurityFlags = new Buffer("\xcd");
        var bufZero = new Buffer("\x00\x00");

        this.put(bufCookie);
        this.put(bufSecurityFlags);
        this.putShort(this.port);
        this.putDataArray([
            "\xf5\xff\xff\xf5",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
            "\xff\xff\xff\xff",
        ]);
        this.put(bufZero);
        this.putLong(this.session);
        this.putLong(this.session2);
    }

    public decode(): void {
        super.decode();
        //TODO, not needed yet
    }

    private putDataArray(data: Array<string>): void {
        for (var i = 0; i < data.length; i++) {
            var row = data[i];
            var buf = new Buffer(row);

            this.putTriad(buf.length);
            this.put(buf);
        }
    }
}