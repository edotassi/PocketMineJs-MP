
import protocol = require("DataPacket");

export class DATA_PACKET_A extends protocol.DataPacket {
    public static get ID(): number {
        return 0x8A;
    }
}