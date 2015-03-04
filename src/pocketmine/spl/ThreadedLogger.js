var ThreadedLogger = (function () {
    function ThreadedLogger() {
    }
    ThreadedLogger.prototype.log = function (message) {
        console.log(message);
    };
    return ThreadedLogger;
})();
exports.ThreadedLogger = ThreadedLogger;
