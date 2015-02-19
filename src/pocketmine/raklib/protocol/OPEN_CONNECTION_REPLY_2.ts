
import protocol = require("Packet");
import rakLib = require("../RakLib");

export class OPEN_CONNECTION_REPLY_2 extends protocol.Packet {
    public static get ID(): number {
        return 0x08;
    }

    public serverID: number;
    public clientPort: number;
    public mtuSize: number;

    public encode(): void {
        super.encode();

        var bufMagic = new Buffer(rakLib.RakLib.MAGIC);
        this.put(bufMagic);
        this.putLong(this.serverID);
        this.putShort(this.clientPort);
        this.putShort(this.mtuSize);
        this.putByte(0);
    }

    public decode(): void {
        super.decode();
        this.offset += 16; // magic
        this.serverID = this.getLong();
        this.clientPort = this.getShort(false);
        this.mtuSize = this.getShort(false);
        // server security
    }
}