
import protocol = require("Packet");

export class CLIENT_CONNECT_DataPacket extends protocol.Packet {

    public static get ID(): number {
        return 0x09;
    }

    public clientID: number;
    public session: number;
    public unknow: Buffer;

    public encode(): void {
        super.encode();
        this.putLong(this.clientID);
        this.putLong(this.session);
        this.put(new Buffer("\x00"));
    }

    public decode(): void {
        super.decode();
        this.clientID = this.getLong();
        this.session = this.getLong();
        this.unknow = this.get(1);
    }
}