
var logFilename = Date.now().toString() + ".log";
function logResult(result){
    var timestamp = Date.now().toString();
    var logEntry = timestamp + "," + result.outcome + "," + result.statusCode + "," + result.hostname + "," + result.port + "," + result.path + "," + result.method
    console.log("logging result to ${logFilename}")
    require('fs').appendFileSync(logFilename, logEntry + "\n");
}