/**
 * Created by edoardo on 16/02/2015.
 */

/// <reference path="../../spl/ThreadedLogger.ts" />
/// <reference path="../../../typings/node/node.d.ts"/>


import dgram = require("dgram");

export module RakLib.Server {
    export class UdpServerSocket {
        private socket: dgram.Socket;

        constructor(onPacket: () => {}, logger: Spl.ThreadedLogger, port: number = 19132, interface: string = "0.0.0.0") {

            this.socket = dgram.createSocket("udp4");

            this.socket.bind(port, interface,() => {
                // TODO log error or success
            });

            this.socket.on('message',(msg: Buffer, info: any) => {
                console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
            });
        }

        public getSocket(): any {
            return this.socket;
        }

        public close(): void {
            this.socket.close();
        }

        public writePacket(buffer: Buffer, dest: string, port: number) {
            this.socket.send(buffer, 0, buffer.length, port, dest,() => {
                // TODO log error
            });
        }
    }
}