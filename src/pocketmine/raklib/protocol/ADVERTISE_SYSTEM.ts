
import protocol = require("UNCONNECTED_PONG");

export class ADVERTISE_SYSTEM extends protocol.UNCONNECTED_PONG {
    public static get ID(): number {
        return 0x1d;
    }
}