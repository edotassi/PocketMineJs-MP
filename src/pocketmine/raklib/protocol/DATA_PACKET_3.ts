
import protocol = require("DataPacket");

export class DATA_PACKET_3 extends protocol.DataPacket {
    public static get ID(): number {
        return 0x83;
    }
}