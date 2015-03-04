console.log("Starting");
console.log(__dirname);
var udpServer = require("raklib/server/UDPServerSocket");
var s = new udpServer.UdpServerSocket(packetReceived, null);
console.log("Server started");
var gameloop = require("node-gameloop");
var frameCount = 0;
var id = gameloop.setGameLoop(function (delta) {
    process.title = 'PocketMineJs! (frame=' + frameCount++ + 's, delta=' + delta + ')';
}, 1000 / 30);
function packetReceived(buffer, info) {
}
