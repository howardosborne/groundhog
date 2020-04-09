
var logFilename = "results_" + Date.now().toString() + ".log";
console.log("logging results to: " + logFilename);
exports.logResult = function logResult(result){
    var timestamp = Date.now().toString();
    var logEntry = timestamp + "," + result.outcome + "," + result.statusCode + "," + result.hostname + "," + result.port + "," + result.path + "," + result.method
    require('fs').appendFileSync(logFilename, logEntry + "\n");
}
