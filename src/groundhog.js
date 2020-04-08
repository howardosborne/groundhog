var build = require('./buildSchedule.js');
var test = require('./runTest.js');
const actions = "To run groundhog, run one of the following: \n buildSchedule \n runTest \n help\n"

if(process.argv.length <3){console.log(actions)}
else if (process.argv[2] == 'buildSchedule'){build.buildSchedule()}
else if (process.argv[2] == 'runTest'){test.runTest()}
else{console.log(actions)}