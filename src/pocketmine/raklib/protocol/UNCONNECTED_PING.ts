
import protocol = require("Packet");
import rakLib = require("../RakLib");

export class UNCONNECTED_PING extends protocol.Packet {
    public static get ID(): number {
        return 0x01;
    }

    public pingID: number;

    public encode(): void {
        super.encode();
        this.putLong(this.pingID);

        var buf = new Buffer(rakLib.RakLib.MAGIC);
        this.put(buf);
    }

    public decode(): void {
        super.decode();
        this.pingID = this.getLong();
        // magic
    }
}