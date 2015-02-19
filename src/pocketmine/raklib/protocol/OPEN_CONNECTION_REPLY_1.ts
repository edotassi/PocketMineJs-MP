
import protocol = require("Packet");
import rakLib = require("../RakLib");

export class OPEN_CONNECTION_REPLY_1 extends protocol.Packet {
    public static get ID(): number {
        return 0x06;
    }

    public serverID: number;
    public mtuSize: number;

    public encode(): void {
        super.encode();

        var bufMagic = new Buffer(rakLib.RakLib.MAGIC);

        this.put(bufMagic);
        this.putLong(this.serverID);
        this.putByte(0);
        this.putShort(this.mtuSize);
    }

    public decode(): void {
        super.decode();
        this.offset += 16;
        this.serverID = this.getLong();
        this.getByte(); // security
        this.mtuSize = this.getShort(false);
    }
}