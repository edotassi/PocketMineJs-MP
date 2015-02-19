
import protocol = require("Packet");
import rakLib = require("../RakLib");

export class OPEN_CONNECTION_REQUEST_1 extends protocol.Packet {
    public static get ID(): number {
        return 0x05;
    }

    public protocol: number = rakLib.RakLib.PROTOCOL;
    public mtuSize: number;

    public encode(): void {
        super.encode();
        var buf = new Buffer(rakLib.RakLib.MAGIC);
        this.put(buf);
        this.putByte(this.protocol);

        var mtuRepeat: string = new Array(this.mtuSize - 17).join('\x00');
        var bufMtuRepeat = new Buffer(mtuRepeat);
        this.put(bufMtuRepeat);
    }

    public decode(): void {
        super.decode();

        this.offset += 16; // magic
        this.protocol = this.getByte();
        this.mtuSize = this.getAll().length - 18; // TODO check 18
    }
}