exports.runTest = function runTest(testParams = './testParams.json'){
    var config = require(testParams);
    var fs = require('fs');
    var logger = require('./logger.js');
    const regex = RegExp(config.filter);

    //read the Schedule file
    //for each line in test Schedule, schedule a request

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
            if(result["outcome"] != "error"){result["outcome"] = "pass"};
            result["statusCode"] = res.statusCode;
            console.log(result["outcome"], result.path)
            logger.logResult(result);
            });
            req.on('error', (e) => {
                console.error(e);
                result["outcome"] = "error"
                result["details"] = e
            });
            req.end();
        }


    function runJSONBasedTest(){
        var testSchedule = require(config.testSchedule);
        //console.log(testSchedule)
        testSchedule.forEach(scheduleTest);
        function scheduleTest(value, index, array) {
            setTimeout(makeRequest, value.delay, value.protocol, value.port, value.method, value.hostname, value.path);
        }
        return "done";
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
        return "done";
    }

    if(config.testScheduleFormat=="csv"){runCSVBasedTest();}
    else if(config.testScheduleFormat=="json"){runJSONBasedTest();}
    else{console.log("test Schedule format not recognised");}
}