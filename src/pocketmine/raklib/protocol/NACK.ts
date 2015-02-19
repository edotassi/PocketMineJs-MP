
import protocol = require("AcknowledgePacket");

export class NACK extends protocol.AcknowledgePacket {
    public static get ID(): number {
        return 0xa0;
    }
}