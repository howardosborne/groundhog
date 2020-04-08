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

## Todo
- add error handling
- test with wider variety of logs 
- make a self-standing results logger (csv?)
- consider a full results tree (json?)
- offer origin server
- add 'intelligent' origin server feature which provides response codes as set in access logs
### for json-based test
- put in headers 
- put in cookies
- put in a before execute and after execute function
- think about wrapping up run and build test features
