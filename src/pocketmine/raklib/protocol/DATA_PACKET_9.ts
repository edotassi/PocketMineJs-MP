
import protocol = require("DataPacket");

export class DATA_PACKET_9 extends protocol.DataPacket {
    public static get ID(): number {
        return 0x89;
    }
}