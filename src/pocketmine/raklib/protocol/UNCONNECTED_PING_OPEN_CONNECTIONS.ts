
import protocol = require("UNCONNECTED_PING");

export class UNCONNECTED_PING_OPEN_CONNECTIONS extends protocol.UNCONNECTED_PING {
    public static get ID(): number {
        return 0x02;
    }
}