
import protocol = require("Packet");

export class CLIENT_HANDSHAKE_DataPacket extends protocol.Packet {

    public static get ID(): number {
        return 0x13;
    }

    public cookie: string;
    public security: string;
    public port: number;
    public dataArray0: Buffer; // TODO maybe wrong
    public dataArray: Array<Buffer>; // TODO maybe wrong
    public timestamp: string;
    public session2: number;
    public session: number;

    public encode(): void {
        super.encode();
    }

    public decode(): void {
        super.decode();
        this.cookie = this.get(4).toString('utf8');
        this.security = this.get(1).toString('utf8');
        this.port = this.getShort(false);
        this.dataArray0 = this.get(this.getByte());
        this.dataArray = this.getDataArray(9);
        this.timestamp = this.get(2).toString("utf8");
        this.session2 = this.getLong(false);
        this.session = this.getLong(false);
    }

    private getDataArray(len: number = 10): Array<Buffer> {
        var data: Array<Buffer> = [];
        for (var i = 1; i < len && !this.feof(); ++i) {
            data.push(this.get(this.getTriad()));
        }
        return data;
    }
}