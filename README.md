# Groundhog
Groundhog is a utility for testing the impact of changes made to webcaches.
It works by taking the requests made in access logs and providing a user-friendly way to 
replay part or all of the logs.
The results can then be chewed over to determine whether to promote the configuration change to Live or tweak it some more.

##why make it
Caching is a fundamental part of performance optimisation
The configuration can be powerful and complex 
Not always obvious what the consequences of making a change would be.
Can have unlooked for side effects
is a tradeoff between speed and accuracy, such as with market data
With Groundhog changes can be tested out and the consequences evaluated

##Todo
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
