var newrelic = require('newrelic'),
config = require('./config.json'),
http   = require('http'),
twilio = require('twilio'),
client = require('twilio')(config.ACCOUNT_SID, config.AUTH_TOKEN),
port   = process.env.PORT || 3000;

http.createServer(function (req, res) {
  console.dir(req);
  //Create TwiML response
  var twiml = new twilio.TwimlResponse();
  twiml.say('Yo mother fucker come on up to suite 522', {
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

}).listen(port);

console.log('TwiML servin\' server running on PORT: ' + port);
