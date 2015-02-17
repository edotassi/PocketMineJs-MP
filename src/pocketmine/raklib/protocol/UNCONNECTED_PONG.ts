
import protocol = require("Packet");
import rakLib = require("../RakLib");

export class UNCONNECTED_PONG extends protocol.Packet {

    public static get ID(): number {
        return 0x1c;
    }

    public pingID: number;
    public serverID: number;
    public serverName: string;

    public encode():void {
        super.encode();
        this.putLong(this.pingID);
        this.putLong(this.serverID);
        this.put(new Buffer(rakLib.RakLib.MAGIC));
        this.putString(this.serverName);
    }

    public decode(): void {
        super.decode();
        this.pingID = this.getLong(false);
        this.serverID = this.getLong(false);
        this.offset += 16; // magic
        this.serverName = this.getString();
    }
} 