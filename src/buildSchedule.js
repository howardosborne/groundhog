var config = require('./buildParams.json');
var fs = require('fs');

const regex = RegExp(config.filter);
var timeFrom = undefined;
var testScheduleFilename = Date.now().toString() + "." + config.testScheduleFormat
var requests = [];

var lineReader = require('readline').createInterface({
    input: fs.createReadStream(config.log)
  });
  
  lineReader.on('line', function (line) {
      if(regex.test(line)){
        fields = line.split(config.delimiter);
        timestamp = Date.parse(fields[config.timestamp])
        if(timeFrom==undefined){
            timeFrom=timestamp;
        }
        delay = timestamp-timeFrom;
        //work out if the hostname needs to be different based on the destination map 
        //- would expect it to be when using live logs to drive tests in a test environment
        map = config.destinationMap;
        if(map[fields[config.remote_addr]] !== undefined){
                destinationHost = config.destinationMap[fields[config.remote_addr]]
        }
        else{
            destinationHost = fields[config.remote_addr]
        }
        requestParts = fields[config.request].split(" ");
        var request = {"delay":delay.toString(), "method": requestParts[0], "hostname": destinationHost, "path": requestParts[1], "version": requestParts[2], "protocol": config.protocol, "port": config.port}
        requests.push(request);
        //var testEntry = delay.toString() + " " + requestParts[0] + " " + destinationHost + " " + requestParts[1] + " " + requestParts[2] + " " + config.protocol + " " + config.port
        //fs.appendFileSync(testScheduleFilename, testEntry + "\n");
      }
  });
  lineReader.on('close', function close(){
    if(config.testScheduleFormat == "csv"){
        //turn object to CSV and write out
        requests.forEach(appendToFile);
        function appendToFile(value, index, array) {
            var testEntry = value.delay + " " + value.method + " " + value.hostname + " " + value.path + " " + value.version + " " + value.protocol + " " + value.port
            fs.appendFileSync(testScheduleFilename, testEntry + "\n");
        }

    }
    else{
        jsonStr = JSON.stringify(requests);
        fs.appendFileSync(testScheduleFilename, jsonStr);
    }
  }
  );
