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
      if(deviceId) {
        redisClient.incr(deviceId)
      }
	}
    redisClient.incr("total")
	res.send("")
})

getRedis = (key) => {
  return new Promise((resolve,reject)=> {
    redisClient.get(key, (err, value)=> {
      if(err){
        reject(err)
      }
      resolve(value)
    })
  })
}

packKeys = (keys) => {
  return new Promise(async (resolve, reject) => {
    try{
      body = {}
      body.result = {}
      body.size = keys.length
      for(let i=0; i< keys.length; i++) {
        let key = keys[i]
          let cnt = await getRedis(key)
          console.log("one record:", key, cnt)
          body.result[key] = cnt
      }
      resolve(body)
    } catch(err) {
      console.log("reject:", err)
      reject(err)
    }
  });
}

app.get('/allKeys', (req, res) => {
  console.log("try to get all keys")
  redisClient.keys('*', (err , keys) => {
    if(err) res.status(500).send(err)
    console.log("keys:",keys)
    packKeys(keys).then(body => {
      console.log("send res")
      res.send(body) 
    }).catch(err => {
      res.status(500).send(err)
    })
  })
})

app.listen(port, () => console.log("example is running"))

