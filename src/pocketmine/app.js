console.log("Starting");
var server = require("raklib/server/UDPServerSocket");
var s = new server.RakLib.Server.UdpServerSocket(null, null);
console.log("Server started");
setTimeout(function () {
    s.close();
    console.log("Timeout ended");
}, 15000);
var Hello;
(function (Hello) {
    var World = (function () {
        function World() {
            console.log("Hello wordl!!");
        }
        return World;
    })();
    Hello.World = World;
})(Hello = exports.Hello || (exports.Hello = {}));
