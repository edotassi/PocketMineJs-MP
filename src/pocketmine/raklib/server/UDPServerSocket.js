var dgram = require("dgram");
var UdpServerSocket = (function () {
    function UdpServerSocket(onPacket, logger, port, interface) {
        if (port === void 0) { port = 19132; }
        if (interface === void 0) { interface = "0.0.0.0"; }
        this.socket = dgram.createSocket("udp4");
        this.socket.bind(port, interface, function () {
        });
        this.socket['on']('message', function (msg, info) {
            console.log('Received %d bytes from %s:%d\n', msg.length, info.address, info.port);
            onPacket(msg, info);
        });
    }
    UdpServerSocket.prototype.getSocket = function () {
        return this.socket;
    };
    UdpServerSocket.prototype.close = function () {
        this.socket.close();
    };
    UdpServerSocket.prototype.writePacket = function (buffer, dest, port) {
        this.socket.send(buffer, 0, buffer.length, port, dest, function () {
        });
    };
    return UdpServerSocket;
})();
exports.UdpServerSocket = UdpServerSocket;
