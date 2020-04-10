var assert = require('assert');
//this needs some work to make return actually meaningful...
//spin up a couple of servers - one to act as the cache
var ps = require('child_process');
var fs = require('fs');
describe('Build Schedule', function() {
    describe('#buildSchedule', function() {
      it('should create a test schedule', function(done) {
        //use the example access log or make a new one
        //make a config file or use the example one
        var build = require('../buildSchedule.js');
        var outcome = build.buildSchedule();
        //wait for file to be made and check contents
        setTimeout(checkLog,5000);
        function checkLog(){
          //look for a log file
          var schedule = require('../' + build.getTestScheduleFilename());
          assert.equal(schedule[0].delay, 0);
          done();
        }
      });
    });
  });

  describe('Run Test', function() {
    describe('#runTest', function() {
      it('should run a test schedule', function(done) {
        var test = require('../RunTest.js');
        test.runTest();
        setTimeout(checkStatus,5000);
        function checkStatus(){
          assert.equal(test.getStatus(), "in progress");
          done();
        }
      });
    });
  });