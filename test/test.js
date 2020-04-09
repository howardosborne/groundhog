var assert = require('assert');
//this needs some work to make return actually meaningful...

describe('Build Schedule', function() {
    describe('#buildSchedule', function() {
      it('should create a test schedule', function() {
        var build = require('../src/buildSchedule.js');
        var outcome = build.buildSchedule();
        assert.equal(outcome, "done");
      });
    });
  });

  describe('Run Test', function() {
    describe('#runTest', function() {
      it('should run a test schedule', function() {
        var test = require('../src/RunTest.js');
        var outcome = test.runTest();
        assert.equal(outcome, "done");
      });
    });
  });