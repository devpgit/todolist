const gcal = require('google-calendar');

module.exports = function getList(token){
	return new Promise((resolve, reject)=>{
		var google_calendar = new gcal.GoogleCalendar(token);
		google_calendar.events.list('primary',function(err, list) {
			if (err) {
				reject('無效的token');
			}
			resolve(list);
		});
	})

}