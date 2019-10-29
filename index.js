const express = require('express')
const app = express()
const port = 8088

app.get('/', (req, res) => res.send('hello world'))

app.get('/logo', (req, res) => {
  console.log("receive a call")
	let query = req.query
	if(query) {
		let deviceId = req.query.deviceId
		console.log("query", req.query)
		console.log("get a device:", deviceId)
		if(req.query.userTag)
			console.log("userTAG:", req.query.userTag)
	}
		
	res.send("")
})

app.listen(port, () => console.log("example is running"))

