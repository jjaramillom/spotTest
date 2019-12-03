# Spotcap programming task

The task consists in developing a web API using Node.js. This API should include an endpoint, which takes some finance information in the body, and returns the IRR and APR to the client.

In order to run the web server, you must:

- Have installed Node.js.

- Have installed NPM.

- To run the server execute the following commands using the console (should be done on the root folder of the project):
`npm install`
`npm start`

The server will be running on port 3000. To test that it is running correctly, a GET request to the localhost:3000 should return the following message:
**{"msg":"server is running"}**

The public endpoint that calculates the APR and IRR is exposed under localhost:3000/calculate. It supports HTTP POST method. The request should include within its body the data to be processed in the following format:

```javascript
{
	"principal": 51020400,
	"upfrontFee": {"value": 1020400},
	"upfrontCreditlineFee": {"value": 0},
	"schedule": [{
		"id": 1,
		"date": "2016-10-20",
		"principal": 3595000,
		"interestFee": 1530600
	}, ...]
}
```
There are some tests included in the project. In order to run these, execute the following command using the console (should be done on the root folder of the project):
`npm test`