const gcal = require('google-calendar');

module.exports = function del(token, id){
	return new Promise((resolve, reject)=>{
		var google_calendar = new gcal.GoogleCalendar(token);
		google_calendar.events.delete('primary', id,function(err, result) {
			if (err) {
				reject('無效的token');
            }
			resolve('OK');
		});
	})

}