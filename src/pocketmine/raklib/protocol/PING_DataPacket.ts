
import protocol = require("Packet");

export class PING_DataPacket extends protocol.Packet {
    public static get ID(): number {
        return 0x00;
    }

    public pingID: number;

    public encode(): void {
        super.encode();
        this.putLong(this.pingID);
    }

    public decode(): void {
        super.decode();
        this.pingID = this.getLong();
    }
}