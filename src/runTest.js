var config = require('./testParams.json');
var fs = require('fs');
//var logger = require('./logger.js');
const regex = RegExp(config.filter);

//read the Schedule file
//for each line in test Schedule, schedule a request

var logFilename = Date.now().toString() + ".log";
function logResult(result){
    var timestamp = Date.now().toString();
    var logEntry = timestamp + "," + result.outcome + "," + result.statusCode + "," + result.hostname + "," + result.port + "," + result.path + "," + result.method
    require('fs').appendFileSync(logFilename, logEntry + "\n");
}

function makeRequest(protocol, port, method, hostname, path) {
    var http, port;
    var result = {};
    result["outcome"] = "started";
    http = require(protocol);
    var options = {
      hostname: hostname,
      port: port,
      path: path,
      method: method
    };
    Object.assign(result,options);
    const req = http.request(options, (res) => {
        result["statusCode"] = res.statusCode; 
        res.on('data', (d) => {});
            result["outcome"] = "error"
        });
        req.on('error', (e) => {
            console.error(e);
            result["outcome"] = "error"
            result["details"] = e
        });
        req.end(log);
        function log(){
            if(result["outcome"] != "error"){result["outcome"] = "pass"};
            logResult(result);
        }
        
    }


  function runJSONBasedTest(){
      var testSchedule = require(config.testSchedule);
      //console.log(testSchedule)
      testSchedule.forEach(scheduleTest);
      function scheduleTest(value, index, array) {
          setTimeout(makeRequest, value.delay, value.protocol, value.port, value.method, value.hostname, value.path);
      }
  }
  function runCSVBasedTest(){
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(config.testSchedule)
    });
  
    lineReader.on('line', function (line) {
        if(regex.test(line)){
            fields = line.split(config.csvformat.delimiter);
            timestamp = fields[config.csvformat.timestamp];
            //console.log(fields[config.csvformat.protocol])
            setTimeout(makeRequest, timestamp, fields[config.csvformat.protocol], fields[config.csvformat.port], fields[config.csvformat.method], fields[config.csvformat.hostname], fields[config.csvformat.path]);
        }
    });
  }

  if(config.testScheduleFormat=="csv"){runCSVBasedTest();}
  else if(config.testScheduleFormat=="json"){runJSONBasedTest();}
  else{console.log("test Schedule format not recognised");}