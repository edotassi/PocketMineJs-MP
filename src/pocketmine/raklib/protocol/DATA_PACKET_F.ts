
import protocol = require("DataPacket");

export class DATA_PACKET_F extends protocol.DataPacket {
    public static get ID(): number {
        return 0x8e;
    }
}