
import protocol = require("Packet");

export class CLIENT_DISCONNECT_DataPacket extends protocol.Packet {
    
    public static get ID(): number {
        return 0x15;
    }

    public encode(): void {
        super.encode();
    }

    public decode(): void {
        super.decode();
    }
}