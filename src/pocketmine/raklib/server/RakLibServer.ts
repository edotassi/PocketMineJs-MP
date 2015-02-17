
import logging = require("../../spl/ThreadedLogger");
import udpServer = require("UDPServerSocket");
import dgram = require("dgram");
import sessionManager = require("SessionManager");

export class RakLibServer {
    private port: number;
    private interface: string;
    private logger: logging.ThreadedLogger;
    private packetRevc: (buffer: Buffer) => void;

    constructor(logger: logging.ThreadedLogger, port: number, ip: string) {
        if (port < 1 || port > 65536) {
            throw new Error("Invalid port range");
        }

        this.port = port;

        this.interface = ip;
        this.logger = logger;
    }

    public setCallbackForRecvPacket(callback: (buffer: Buffer) => void) {
        this.packetRevc = callback;
    }

    public run(): void {
        var server = new udpServer.UdpServerSocket(this.callback, this.logger, this.port, this.interface);
// ReSharper disable once WrongExpressionStatement
        new sessionManager.SessionManager(this, server);
    }

    private callback(buffer: Buffer, info: dgram.RemoteInfo): void {
        this.packetRevc(buffer);
    }
}