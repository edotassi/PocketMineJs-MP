
import protocol = require("DataPacket");

export class DATA_PACKET_B extends protocol.DataPacket {
    public static get ID(): number {
        return 0x8B;
    }
}