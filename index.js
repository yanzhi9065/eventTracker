const express = require('express')
const redis = require('redis')
const app = express()
const port = 8088

redisClient    = redis.createClient({
  port      : 6379,               // replace with your port
  host      : '127.0.0.1',        // replace with your hostanme or IP address
  // optional, if using SSL
  // use `fs.readFile[Sync]` or another method to bring these values in
});

app.get('/', (req, res) => res.send('hello world'))

app.get('/logo', (req, res) => {
  console.log("receive a call")
	let query = req.query
	if(query) {
      let deviceId = req.query.deviceId
      console.log("get a device:", deviceId)
      if(deviceId)
        redisClient.incr(deviceId)
	}
		
	res.send("")
})

app.listen(port, () => console.log("example is running"))

