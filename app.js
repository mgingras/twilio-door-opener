var newrelic = require('newrelic'),
config = require('./config.json'),
http   = require('http'),
twilio = require('twilio'),
client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN),
port   = (process.env.PORT || 3000),
url    = require('url');

http.createServer(function (req, res) {
  var query = url.parse(req.url, true).query;
  console.dir(query);
  if(query.From === config.FRONT_DOOR_NUMBER){

    //Create TwiML response
    var twiml = new twilio.TwimlResponse();
    twiml.say('Hey, come up to suite ' + config.SUITE_NUMBER, {
      voice:'woman',
      language:'en-gb'
    });
    twiml.pause();
    twiml.play({digits:'6'});
    twiml.pause('5');

    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());

    //Send an SMS text message
    client.sendMessage({
      to: config.RECIPIENT,
      from: config.SENDER,
      body: 'Just let someone in.'
      }, function(err, text) { //this function is executed when a response is received from Twilio
      if(err){
        console.dir(err);
      }
      if (!err) { // "err" is an error received during the request, if any
        console.log('Sent text to ' + config.RECIPIENT);
      }
    });
  } else {
    var twiml = new twilio.TwimlResponse();
    twiml.dial(config.RECIPIENT);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
}).listen(port);

console.log('TwiML servin\' server running on PORT: ' + port);
