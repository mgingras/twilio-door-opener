# twilio-door-opener

My appartment has a pretty standard system at the front door that lets visitors dial a buzz code at the front door which calls my phone allowing me to chat with and unlock the door by pressing 6 on the dial pad.

**Wrench** - I never leave the ringer on my phone - Super annoying for guests.

Solution: Wrote this simple NodeJS app that listens for requests (from Twilio) and responds with an predetermined voice message ("Come on up to Suite ...") then plays the DTMF tone to open the door. As a optimization, its configured to get Twilio to send a text giving me warning to put pants on before answering the door.

## To set it up:
1. Clone this repository.
2. Rename, sample_config.json to config.json and fill in the appropriate slots.
3. Deploy to Heroku. (or preferred hosting environment, using forever on an AWS instance would work (might actually work well in aws Lambda)) 
5. Point your Twilio number @ the URL for your Heroku app.

## Roadmap:
- Add pincode prompt that uses DTMF tones to secure this with escape that forwards call to user
