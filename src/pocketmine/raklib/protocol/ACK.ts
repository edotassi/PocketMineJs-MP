
import protocol = require("AcknowledgePacket");

export class ACK extends protocol.AcknowledgePacket {
    public static get ID(): number {
        return 0xc0;
    }
}