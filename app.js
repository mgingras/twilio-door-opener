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
  //Create TwiML response
  var twiml = new twilio.TwimlResponse();
  // If text message
  if(query.MessageSid){
    // Forward the SMS text message
    client.sendMessage({
      to: config.RECIPIENT,
      from: config.SENDER,
      body: 'SMS from: ' + query.From + '\nMsg: ' + query.Body
      }, function(err, text) { //this function is executed when a response is received from Twilio
      if(err){
        console.dir(err);
      } else { // "err" is an error received during the request, if any
        console.log('Forwarded text to: ' + config.RECIPIENT +'\nMessage: ' + query.Body);
      }
    });
  } else if(query.From === config.FRONT_DOOR_NUMBER){
    twiml.say('Hey, come up to suite ' + config.SUITE_NUMBER, {
      voice:'woman',
      language:'en-gb'
    });
    twiml.pause();
    twiml.play({digits:'6'});
    twiml.pause();

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
      } else { // "err" is an error received during the request, if any
        console.log('Sent text to ' + config.RECIPIENT);
      }
    });
  } else {
    twiml.dial(config.RECIPIENT); // Forward call to recipients number if not from front door
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
  }
}).listen(port);

console.log('TwiML servin\' server running on PORT: ' + port);
