/**
 * Created by edoardo on 13/02/2015.
 */

/// <reference path="raklib/server/UDPServerSocket.ts"/>

console.log("Starting");
console.log(__dirname);



var s = new udpServer.UdpServerSocket(packetReceived, null);
console.log("Server started");

var gameloop = require("node-gameloop");

// start the loop at 30 fps (1000/30ms per frame) and grab its id 
var frameCount = 0;
var id = gameloop.setGameLoop((delta) => {
    // `delta` is the delta time from the last frame 
    process.title = 'PocketMineJs! (frame=' + frameCount++ + 's, delta=' + delta + ')';
}, 1000 / 30);


function packetReceived(buffer: Buffer, info: any):void {
    
}
