/**
 * Created by edoardo on 13/02/2015.
 */

console.log("Starting");

//import server = require("raklib/server/UDPServerSocket");
//var s = new server.RakLib.Server.UdpServerSocket(null, null);

console.log("Server started");

setTimeout(() => {
    //s.close();
    console.log("Timeout ended");
}, 15000);

export module Hello {
    export class World {
        constructor() {
            console.log("Hello wordl!!");
        }
    }
}

