
import protocol = require("DataPacket");

export class DATA_PACKET_E extends protocol.DataPacket {
    public static get ID(): number {
        return 0x8e;
    }
}