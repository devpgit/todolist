const gcal = require('google-calendar');

module.exports = function patchList(token, id, event){
	return new Promise((resolve, reject)=>{
        var google_calendar = new gcal.GoogleCalendar(token);
		google_calendar.events.patch('primary', id, event,function(err, list) {
			if (err) {
                console.log('error');
				reject('無效的token');
            }
			resolve('OK');
		});
	})

}