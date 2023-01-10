var Alarm = {
	setDealOfDayAlarm: function(){
		var midnight = new Date();
		midnight.setHours(12+20, 0, 0, 0);
		//chrome.alarms.create("DealOfDay", {midnight.getTime(), periodInMinutes: 1440} );
		chrome.alarms.create("DealOfDay", {when: new Date().getTime() + 10000, periodInMinutes: 1} );
	}
}