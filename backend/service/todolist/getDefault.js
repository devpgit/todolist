const gcal = require('google-calendar');

module.exports = function get(token, id){
	return new Promise((resolve, reject)=>{
		var google_calendar = new gcal.GoogleCalendar(token);
		google_calendar.events.get('primary', id,function(err, result) {
			if (err) {
				reject('無效的token');
            }
            // console.log('result',result);
			resolve(result);
		});
	})

}