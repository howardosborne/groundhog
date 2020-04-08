# Groundhog
Groundhog is a utility for testing the impact of changes made to webcaches.
It works by taking the requests made in access logs and providing a user-friendly way to 
replay part or all of the logs.
The results can then be chewed over to determine whether to promote the configuration change to live or tweak it some more.

## Why make it?
Caching is a fundamental part of performance optimisation
Over time caches have become more powerful, flexible and complex 
However, this increased utility means that changes made to configuration need careful consideration and it is not always obvious what the consequences of making a change would be.
Even when the changes are well understood, the tradeoff between speed and accuracy (such as with market data) needs to be fully appreciated.

With Groundhog changes can be tested out and the consequences evaluated before commiting to live.

##how does it work?
there are four possible activities
1. Build a schedule
Run buildSchedule (after changing the parameters in the buildParams file to point to your access log)
decide whether to make a simple csv schedule which is easy to edit but has limited capability
or a json schedule which has the possibility of richer features.
2. Set up test origin servers
The origin server (the server the web cache is trying to relieve) may not be usable for testing. This could be because it is not available in your test environment or the application logic may lead to errors when key test information is not provided.
run server.js for each server being replaced 9after configuring the parameters in serverParams

3. Run a test
Run runTest.js (after changing the paramtrs in testParams)

4. Analyse results
A results file will be created for each test which collates what happened from the client's perspective. However, the really interesting stuff will be in the web cache's access logs.

##Can it be used for load testing the whole system?
Yes - to a point

Testing end applications is best left to tools like JMeter, Gatling, Locust and LoadRunner. This is because applications often contain logic and security which the testing tool has to follow. This could be added to this tool (I'm seriously thinking about it), but even then, creating test 'shapes' to cover scenarios that have not happened before in live is done well by tools like JMeter and why remake what already works well?

##Why Node?
It's good at this kind of thing. Python could also be a good contender...

## Todo
- add error handling
- test with wider variety of logs 
- make a self-standing results logger (csv?)
- consider a full results tree (json?)
- offer origin server
- add 'intelligent' origin server feature which provides response codes as set in access logs

### for json-based schedule
- put in headers 
- put in cookies
- put in a before execute and after execute function
- think about wrapping up run and build test features
