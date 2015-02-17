
import protocol = require("DataPacket");

export class DATA_PACKET_1 extends protocol.DataPacket {
    public static get ID(): number {
        return 0x81;
    }
}