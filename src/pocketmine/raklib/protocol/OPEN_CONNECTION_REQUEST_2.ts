
import protocol = require("Packet");
import rakLib = require("../RakLib");

export class OPEN_CONNECTION_REQUEST_2 extends protocol.Packet {
    public static get ID(): number {
        return 0x07;
    }

    public clientID: number;
    public serverPort: number;
    public mtuSize: number;

    public encode(): void {
        super.encode();
        var buf = new Buffer(rakLib.RakLib.MAGIC);
        this.put(buf);
        this.put(new Buffer("\x00")); //client security (5 bytes?) TODO check \x00
        this.putShort(this.serverPort);
        this.putShort(this.mtuSize);
        this.putLong(this.clientID);
    }

    public decode(): void {
        super.decode();
        this.offset += 16; // Magic
        this.get(5); // Client security
        this.serverPort = this.getShort(false);
        this.mtuSize = this.getShort(false);
        this.clientID = this.getLong();
    }
}