
import rakLib = require("../Binary");

export class Packet {
    public static get ID(): number {
        return -1;
    }

    protected offset: number = 0;

    public buffer: Buffer;
    public sendTime: number;

    protected getAll(): Buffer {
        var buf = new Buffer(this.buffer.length - this.offset);
        this.buffer.copy(buf, 0, this.offset);
        return buf;
    }

    protected get(len: number): Buffer {
        if (len < 0) {
            this.offset = this.buffer.length - 1;
            return new Buffer(0);
        }

        var buf = new Buffer(len);
        this.buffer.copy(buf, 0, this.offset);

        this.offset += len;

        return buf;
    }

    public getLong(signed: boolean = true): number {
        return rakLib.Binary.readLong(this.get(8));
    }

    public getInt(): number {
        return rakLib.Binary.readInt(this.get(4));
    }

    public getShort(signed: boolean): number {
        return signed ? rakLib.Binary.readSignedShort(this.get(2)) : rakLib.Binary.readShort(this.get(2));
    }

    public getTriad(): number {
        return rakLib.Binary.readTriad(this.get(3));
    }

    public getLTriad(): number {
        return rakLib.Binary.readLTriad(this.get(3));
    }

    public getByte(): number {
        return this.buffer[this.offset++];
    }

    public getString(): string {
        var len = this.getShort(false);
        var bufString = this.get(len);
        return bufString.toString("utf8");
    }

    public feof(): boolean {
        return this.buffer[this.offset] == undefined;
    }

    public put(buffer: Buffer): void {
        this.buffer = Buffer.concat([this.buffer, buffer]);
    }

    public putLong(v: number): void {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeLong(v)]);
    }

    public putInt(v: number): void {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeInt(v)]);
    }

    public putShort(v: number): void {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeShort(v)]);
    }

    public putTriad(v: number): void {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeTriad(v)]);
    }

    public putLTriad(v: number) {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeLTriad(v)]);
    }

    public putByte(v: number): void {
        this.buffer = Buffer.concat([this.buffer, rakLib.Binary.writeByte(v)]);
    }

    public putString(v: string): void {
        this.putShort(v.length);
        this.put(new Buffer(v));
    }

    public encode(): void {
        this.buffer = new Buffer(String.fromCharCode(Packet.ID));
    }

    public decode(): void {
        this.offset = 1;
    }

    public clean(): Packet {
        this.buffer = null;
        this.offset = 0;
        this.sendTime = null;
        return this;
    }
}