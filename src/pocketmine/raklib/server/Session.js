var dataPacket4 = require("../protocol/DATA_PACKET_4");
var packetAck = require("../protocol/ACK");
var packetNack = require("../protocol/NACK");
var Session = (function () {
    function Session(sessionManager, address, port) {
        this.messageIndex = 0;
        this.state = Session.STATE_UNCONNECTED;
        this.preJoinQueue = [];
        this.mtuSize = 548;
        this.id = 0;
        this.splitID = 0;
        this.sendSeqNumber = 0;
        this.lastSeqNumber = 0;
        this.packetToSend = [];
        this.recoveryQueue = [];
        this.needACK = [];
        this.lastReliableIndex = -1;
        this.sessionManager = sessionManager;
        this.address = address;
        this.port = port;
        this._sendQueue = new dataPacket4.DATA_PACKET_4();
        this.lastUpdate = Date.now();
        this.startTime = Date.now();
        this.isActive = false;
        this.windowStart = -(Session.WINDOW_SIZE / 2);
        this.windowEnd = Session.WINDOW_SIZE / 2;
        this.reliableWindowStart = 0;
        this.reliableWindowEnd = Session.WINDOW_SIZE;
    }
    Object.defineProperty(Session, "STATE_UNCONNECTED", {
        get: function () {
            return 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session, "STATE_CONNECTING_1", {
        get: function () {
            return 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session, "STATE_CONNECTING_2", {
        get: function () {
            return 2;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session, "STATE_CONNECTED", {
        get: function () {
            return 3;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Session, "WINDOW_SIZE", {
        get: function () {
            return 1024;
        },
        enumerable: true,
        configurable: true
    });
    Session.prototype.getAddress = function () {
        return this.address;
    };
    Session.prototype.getPort = function () {
        return this.port;
    };
    Session.prototype.getID = function () {
        return this.id;
    };
    Session.prototype.update = function (time) {
        if (!this.isActive && (this.lastUpdate + 10) < time) {
            this.disconnect("timeout");
            return;
        }
        this.isActive = false;
        if (this.ACKQueue.length > 0) {
            var pkAck = new packetAck.ACK();
            pkAck.packets = this.ACKQueue;
            this.sendPacket(pkAck);
            this.ACKQueue = [];
        }
        if (this.NACKQueue.length > 0) {
            var pkNack = new packetNack.NACK();
            pkNack.packets = this.NACKQueue;
            this.sendPacket(pkNack);
            this.NACKQueue = [];
        }
        if (this.packetToSend.length > 0) {
            var pk = this.packetToSend[0];
            pk.seqNumber = this.sendSeqNumber++;
            pk.sendTime = Date.now();
            pk.encode();
            this.recoveryQueue[pk.seqNumber] = pk;
            this.sendPacket(pk);
            this.packetToSend.splice(0, 1);
        }
        var keysNeedAck = Object.keys(this.needACK);
        if (keysNeedAck.length > 0) {
            for (var i = 0; i < keysNeedAck.length; i++) {
                var identifierAck = keysNeedAck[i];
                var indexes = this.needACK[identifierAck];
                if (indexes.length === 0) {
                    this.sessionManager.notifyACK(this, identifierAck);
                    delete this.needACK[identifierAck];
                }
            }
        }
        var keysReceivedWindows = Object.keys(this.receiveWindow);
        for (var i = 0; i < keysReceivedWindows.length; i++) {
            var seq = keysReceivedWindows[i];
            if (parseInt(seq) < this.windowStart) {
                delete this.receiveWindow[seq];
            }
            else {
                break;
            }
        }
        this.sendQueue();
    };
    Session.prototype.disconnect = function (reason) {
        if (reason === void 0) { reason = "unknow"; }
        this.sessionManager.removeSession(this, reason);
    };
    Session.prototype.sendPacket = function (packet) {
        this.sessionManager.sendPacket(packet, this.address, this.port);
    };
    Session.prototype.sendQueue = function () {
    };
    return Session;
})();
exports.Session = Session;
