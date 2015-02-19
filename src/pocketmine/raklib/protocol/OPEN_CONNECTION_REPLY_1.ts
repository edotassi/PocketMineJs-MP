
import protocol = require("Packet");

export class OPEN_CONNECTION_REPLY_1 extends protocol.Packet {
    public static get ID(): number {
        return 0x06;
    }

}