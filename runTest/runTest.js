var config = require('./testParams.json');
var fs = require('fs');
const regex = RegExp(config.filter);

//read the script file
//for each line in test script, schedule a request


function makeRequest(protocol, port, method, hostname, path) {
    var http, port;
    http = require(protocol);
    var options = {
      hostname: hostname,
      port: port,
      path: path,
      method: method
    };
    
    const req = http.request(options, (res) => {
        console.log('statusCode:', res.statusCode);   
        res.on('data', (d) => {});
        });
        req.on('error', (e) => {
            console.error(e);
        });
        req.end();
    }


  function runJSONBasedTest(){
      var testScript = require(config.testScript);

  }
  function runCSVBasedTest(){
    var lineReader = require('readline').createInterface({
        input: fs.createReadStream(config.testScript)
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

  if(config.testScriptFormat=="csv"){runCSVBasedTest();}
  else if(config.testScriptFormat=="json"){runJSONBasedTest();}
  else{console.log("test script format not recognised");}