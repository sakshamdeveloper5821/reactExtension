var Storage = {
	clearAll : function(){
		chrome.storage.local.clear();
	},
	setLastShownTime : function(merchantDomain){
		chrome.storage.local.get('lastShownTimes', function(data){
			if(!data.lastShownTimes){
				data.lastShownTimes = {};
			}
			data.lastShownTimes[merchantDomain] = new Date().getTime();
			chrome.storage.local.set(data);
			//console.log(data);
		})
	},
	setLastAffiliateValidationErrorTime : function(merchantDomain){
		chrome.storage.local.get('lastAffiliateValidationErrorTime', function(data){
			if(!data.lastAffiliateValidationErrorTime){
				data.lastAffiliateValidationErrorTime = {};
			}
			data.lastAffiliateValidationErrorTime[merchantDomain] = new Date().getTime();
			chrome.storage.local.set(data);
			//console.log(data);
		})
	},
	
	setLastShownDealofDay: function(lastShownDealofDay){
		chrome.storage.local.set({lastShownDealofDay:{deal:lastShownDealofDay, lastShownTime: new Date().getTime()}});
	},
	setLastShownTimeAmazon: function(){
		chrome.storage.local.set({lastShownTimeAmazon: new Date().getTime()});
	},
	setLastShownTimeAmazonSmile: function(){
		chrome.storage.local.set({lastShownTimeAmazonSmile: new Date().getTime()});
	},
	getLastShownDealofDay: function(callBackFunction){
		chrome.storage.local.get('lastShownDealofDay', callBackFunction);
	},
	setSettingsCheckboxValue: function(checkboxName, value){
		chrome.storage.local.get('settingsCheckboxValues', function(data){
			data.settingsCheckboxValues[checkboxName] = value;
			chrome.storage.local.set(data);
		});
	},
	setSettingsCheckboxValueDefaultValue: function(){
		chrome.storage.local.set({'settingsCheckboxValues': {
			amazonDetectionCheckbox: true, 
            dealCheckbox: true, 
            similarStoreCheckbox: true, 
            actionCheckbox: true
		}});
	},
	getSettingsCheckboxValues(callBackFunction){
		chrome.storage.local.get('settingsCheckboxValues', callBackFunction);
	},
	setUserId: function(userId){
		chrome.storage.local.set({'userId': userId});
	},
	getUserId: function(callBackFunction){
		chrome.storage.local.get('userId', callBackFunction);
	}
}