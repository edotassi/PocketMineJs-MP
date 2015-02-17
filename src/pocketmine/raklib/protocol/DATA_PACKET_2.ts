
import protocol = require("DataPacket");

export class DATA_PACKET_2 extends protocol.DataPacket {
    public static get ID(): number {
        return 0x82;
    }
}