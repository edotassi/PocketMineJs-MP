
import protocol = require("DataPacket");

export class DATA_PACKET_D extends protocol.DataPacket {
    public static get ID(): number {
        return 0x8d;
    }
}