var express = require('express');
var redis = require('redis');
const { route } = require('./users');

var router = express.Router();

/* redis */
var host = process.env.REDIS_PORT_6379_TCP_ADDR || 'redis';
var port = process.env.REDIS_PORT_6379_TCP_PORT || 6379;
var client = redis.createClient(port, host);
// client.subscribe('message');
// client.on("redis",(channel,message) => {
//   console.log(`Message received from ${channel}: ${message}`);
// })

/* GET home page. */
router.get('/', function(req, res, next) {
  // client.incr('counter', function(err, result) {
  //   if (err) {
  //     return next(err);
  //   }  
  //   res.render('index', { title: 'Express', counter: result });
  // });
});


router.get('/send-redis', async function(req, res, next) {
  const user = {
    id: "123456",
    name: "Davis",
  }
  client.publish("message", JSON.stringify(user))
  // await client.set('message', 'test', redis.print);
  // var value = await client.get('test', redis.print);

  // console.log(value);
  res.send("Publishing an Event using Redis")
})

module.exports = router;
