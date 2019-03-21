const gcal = require('google-calendar');

module.exports = function add(req){
    var event = {
        'summary': `${req.body.summary}`,
        'start': {
            'dateTime': `${req.body.startDate}T00:00:00+08:00`,
            'timeZone': 'Asia/Taipei',
        },
        'end': {
            'dateTime': `${req.body.endDate}T00:00:00+08:00`,
            'timeZone': 'Asia/Taipei',
        },
        'recurrence': [
            'RRULE:FREQ=DAILY;COUNT=2'
        ],
        'reminders': {
            'useDefault': false,
            'overrides': [
                {'method': 'popup', 'minutes': 10},
            ],
        },
        'status': 'tentative'
    };
	return new Promise((resolve, reject)=>{
		var google_calendar = new gcal.GoogleCalendar(req.body.token);
        google_calendar.events.insert('primary',event,function(err, event) {
            if (err) {
                reject('創建失敗')
            }
            resolve('OK');
        });
	})

}