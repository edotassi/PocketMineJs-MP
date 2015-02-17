var udpServer = require("UDPServerSocket");
var sessionManager = require("SessionManager");
var RakLibServer = (function () {
    function RakLibServer(logger, port, ip) {
        if (port < 1 || port > 65536) {
            throw new Error("Invalid port range");
        }
        this.port = port;
        this.interface = ip;
        this.logger = logger;
    }
    RakLibServer.prototype.setCallbackForRecvPacket = function (callback) {
        this.packetRevc = callback;
    };
    RakLibServer.prototype.run = function () {
        var server = new udpServer.UdpServerSocket(this.callback, this.logger, this.port, this.interface);
        new sessionManager.SessionManager(this, server);
    };
    RakLibServer.prototype.callback = function (buffer, info) {
        this.packetRevc(buffer);
    };
    return RakLibServer;
})();
exports.RakLibServer = RakLibServer;
