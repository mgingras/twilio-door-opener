# twilio-door-opener

My appartment has a system that lets visitors dial a buzz code at the door which is supposed to call my phone, then I can respond and talk to them, then press 6 to let them in. 

I wanted to automate this. I did so by creating a node app that listens for requests and responds with an message of which suite to come up to and playing the DTMF tone to open the door. Lastly, Twilio sends you a text to let you know someone just used the number to get in.

The app filters so only calls from the front door phone number will get the message, the rest will get forwarded directly to your number.

## To set it up:
1. Clone this repository.
2. Rename, sample_config.json to config.json and fill in the appropriate slots.
3. Deploy to Heroku.
4. Configure New Relic to ping app for availablity to keep app from sleeping.
5. Point your Twilio number @ the URL for your Heroku app.

## Roadmap:
- Add pincode prompt that uses DTMF tones to secure this with escape that forwards call to user
