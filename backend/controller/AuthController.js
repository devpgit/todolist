const passport = require('passport');
const gcal = require('google-calendar');

module.exports = { 
    googleCallBack(req, res, next){
        passport.authenticate('google', async(err, token) => {
            var result;
            var google_calendar = new gcal.GoogleCalendar(token);
            console.log('token',token);
            var event = {
                'summary': 'Google I/O 2015',
                'location': '800 Howard St., San Francisco, CA 94103',
                'description': 'A chance to hear more about Google\'s developer products.',
                'start': {
                  'dateTime': '2019-05-28T09:00:00-07:00',
                  'timeZone': 'America/Los_Angeles',
                },
                'end': {
                  'dateTime': '2019-05-28T17:00:00-07:00',
                  'timeZone': 'America/Los_Angeles',
                },
                'recurrence': [
                  'RRULE:FREQ=DAILY;COUNT=2'
                ],
                'attendees': [
                  {'email': 'devp.peter@gmail.com'},
                  {'email': 'sbrin@example.com'},
                ],
                'reminders': {
                  'useDefault': false,
                  'overrides': [
                    {'method': 'email', 'minutes': 24 * 60},
                    {'method': 'popup', 'minutes': 10},
                  ],
                },
              };
            
              
            google_calendar.events.list('primary',function(err, list) {
                if (err) {
                  console.log('There was an error contacting the Calendar service: ' + err);
                  return;
                }
                console.log('Event created: %s', JSON.stringify(list, null, 4));
            });


            //read  
            // google_calendar.events.get('primary',
            //     'cc9u5fl18clgp287ovd7vuk978',
            //     function(err, res){
            //     console.log('result', res)
            // })
              

            //insert
            // google_calendar.events.insert('primary',event,function(err, event) {
            //     if (err) {
            //       console.log('There was an error contacting the Calendar service: ' + err);
            //       return;
            //     }
            //     console.log('Event created: %s', JSON.stringify(event));
            // });
            return res.redirect(`${process.env.BASE_URL}/todolist?token=${token}`);
        })(req, res, next)
    }
}