Groundhog is a utility for testing the impact of configuration changes made to web caches.

It works by taking the requests logged in access (or web) logs and providing a user-friendly way to 
replay part or all of the log in a test environment.

The results can then be chewed over to determine whether to promote the configuration change to live or tweak it some more.

## Why do we need to test web cache configuration changes?
Caches are fundamental to website performance.

Over time web caches have become more powerful and flexible. However, this increased utility has meant that configuration changes need careful consideration and it is not always obvious what the consequences of making a change would be.

Even when the changes are well understood, the trade-off between speed and accuracy (such as with time-sensitive data) still needs to be fully thought through.

So how can we do this?

With Groundhog changes can be tested out and the consequences evaluated before commiting to live.

## How to use it
1. Pick a web cache access log (or even a web server log) to use.

2. Build a test schedule

... Change the parameters in the buildParams.json file to point to your access log and make any other changes you wish (see section on parameters).

... Decide whether to make a simple csv schedule which is easy to edit but has limited capability
or a json schedule which has the possibility of richer features.

```
node ./groundhog.js buildSchedule
```

3. Set up test origin servers

... The origin server (the server the web cache is trying to relieve) may not be usable for testing. This could be because it is not available in your test environment or the application logic may lead to errors when key test information is not provided.

... Set the configuring parameters in serverParams

```
node ./originServer.js
```

4. Run a test

... Set the parameters in testParams to choose a test schedule and any other settings you may wish to use.

```
node ./groundhog.js runTest
```

5. Analyse results

... A results file will be created for each test which collates what happened from the client's perspective. However, the really interesting stuff will be in the web cache's access logs.

## Can it be used for testing more than the cache?
Yes - to a point...

Testing the performance of applications is best left to tools like [JMeter](https://jmeter.apache.org), [Gatling](https://gatling.io/), [Locust](https://locust.io/) and [LoadRunner](https://en.wikipedia.org/wiki/LoadRunner).

This is because applications often contain logic and security which the testing tool has to follow. This could be added to this tool (I'm seriously thinking about it), but even then, creating test 'shapes' to cover scenarios that have not happened before in live is done well by tools like JMeter and why remake what already works well?

## Why Node?
Node is good at this kind of thing.

## Why call it Groundhog?
Sometimes you just have to replay a day over and over again (or part of it) until you get it right.

## Can I help/contribute?
yep - get in touch

## Why both CSV and JSON formats?
CSV files are simple to edit manually. JSON is powerful and flexible but a bit trickier to edit.

## Todo
- review error handling
- test with wider variety of logs 
- consider making a full results tree (json?)
- add 'intelligent' origin server feature which provides response codes as set in access logs
- consider adding 'before execute' and 'after execute' functions (for JSON based schedule)
- think about providing a noob-friendly web interface for building test schedules and running tests
- consider adding an access log analyser (with comparison between two access logs)

## Parameters
Running Groundhog needs paramters correctly setting to it knows that to do.

### Build parameters
Before building a schedule, the parameters need to be set 
- to allow the access log to be read correctly
- to make any hostname changes to use in a different environment
- to filter any rows that do not need to be included

A typical buildParams file will look like this:

```javascript
{
    "log":"../test/logs/example_access.log", 
    "delimiter":"|", 
    "timestamp":0, 
    "remote_addr":2, 
    "request":3, 
    "http_user_agent":4,
    "protocol":"http",
    "port":80,
    "destinationMap": {"live.example.com":"preprod.example.local"},
    "testScheduleFormat":"json",
    "filter":".*"
}
```

### Test parameters
The parameters needed for running a test depend on whether you have chosen to use the CSV or JSON formats for the test schedule.

There are three keys common to both formats:
- "testSchedule" denotes which schedule to use
- "testScheduleFormat" denotes whether the schedule is in CSV or JSON format
- "filter" determines which paths to include (by regular expression)

The CSV  format requires an extra key, "csvformat", which is used to set which fields in the file are to be used.

#### CSV Example
```javascript
{
    "testSchedule":"../test/schedules/example_csv_schedule.csv",
    "testScheduleFormat":"csv",
    "filter":".*",
    "csvformat":{
    "delimiter":" ",
    "timestamp":0,
    "method":1,
    "hostname":2,
    "path":3,
    "protocol":5,
    "port":6
    }
}
```

#### JSON example
```javascript
{
    "testSchedule":"../test/schedules/example_json_schedule.json",
    "testScheduleFormat":"json",
    "filter":".*"
}
```
