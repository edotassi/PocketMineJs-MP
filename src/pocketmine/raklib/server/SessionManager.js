var SessionManager = (function () {
    function SessionManager(rakLibServer, udpServerSocket) {
        this.server = rakLibServer;
        this.socket = udpServerSocket;
        this.server.setCallbackForRecvPacket(this.packetReceived);
    }
    SessionManager.prototype.packetReceived = function (buffer) {
    };
    return SessionManager;
})();
exports.SessionManager = SessionManager;
