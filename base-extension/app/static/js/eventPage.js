var Background = {
	tabWiseData: {},
	redirects: {},

//do time validation here for all ribbons, make time related code common, pass indication to load data
	validateLastShownTime : function(request, tabId, callback){
		chrome.storage.local.get('lastShownTimes', function(data){
			if(!data.lastShownTimes || !data.lastShownTimes[request.host] || request.forceLoad){
				callback();
				return true;
			}
			var nowDate = new Date().getTime();
			var pastDate = data.lastShownTimes[request.host];

			var timeDiff = Math.abs(nowDate - pastDate);
			var diffSeconds = Math.ceil(timeDiff / 1000); 
			//console.log('diffSeconds ' + diffSeconds);

			chrome.storage.local.get('timeInSecondToShowOnSameMerchant', function(data){
				//data.timeInSecondToShowOnSameMerchant
				if(diffSeconds > 60){
					callback();
					return true;
				}
			});
			
		})
	},
	loadDealsOnMerchant: function (request, sender, sendResponse){
		var redirectArray = Background.redirects[sender.tab.id];
		Background.redirects[sender.tab.id] = [];
		Background.validateLastShownTime(request, sender.tab.id, function(loadData){
			var manifestData = chrome.runtime.getManifest();
			Storage.getUserId(function(userId){
				var postData = {};
				postData.merchantUrl = encodeURIComponent(request.url);
				postData.partnerId = manifestData.author;
				postData.userId = userId.userId;
				postData.redirects = redirectArray;
				postData.autoLoad = request.autoLoad;
				postData.forceLoad = request.forceLoad;
				//var url = 'https://secure.shopforcause.io/extension/initialData';
				//var url = 'http://localhost:8080/extension/initialData';

				var url = 'https://ykhbiaf1z7.execute-api.us-east-2.amazonaws.com/prod/extensionInitialData';
							
				$.ajax({url:url, 
					cache: false,
					data:  JSON.stringify(postData),
					type:'POST',
					dataType: 'json',
					contentType: 'application/json',
					success: function(data){
						Background.handleLoadDealOnMerchantResponse(data, request, sender, sendResponse);
					}
				});
			});
		});
	},
	handleLoadDealOnMerchantResponse: function(serverData, request, sender, sendResponse){
		
		if(serverData && serverData.showExtension){
			Background.tabWiseData[sender.tab.id] = {};
			Storage.getSettingsCheckboxValues(function(settingsCheckboxValues){
				var ribbon = {};

				ribbon.showAvailableDeals =  serverData.dealList && serverData.dealList.length > 0 && (settingsCheckboxValues.settingsCheckboxValues.dealCheckbox || request.forceLoad);
				ribbon.noDealOnPartner = ((!serverData.dealList || serverData.dealList.length <= 0) && (serverData.merchant && serverData.merchant.active)) && (settingsCheckboxValues.settingsCheckboxValues.dealCheckbox || request.forceLoad);
				ribbon.showSimilarStores =  !ribbon.showAvailableDeals && !ribbon.noDealOnPartner && serverData.similarStores.length > 0 && (settingsCheckboxValues.settingsCheckboxValues.similarStoreCheckbox || request.forceLoad);
				//Temp disable dealOfDay
				//ribbon.dealOfTheDay = !showAvailableDeals && !noDealOnPartner && !showSimilarStores && serverData.dealOfDay && (settingsCheckboxValues.settingsCheckboxValues.dealOfDayCheckbox || request.forceLoad);
				
				//Global Check for any ribbon
				chrome.storage.local.get('lastAffiliateValidationErrorTime', function(data){
					if(data.lastAffiliateValidationErrorTime && data.lastAffiliateValidationErrorTime[request.host] && !request.forceLoad){
						var nowDate = new Date().getTime();
						var pastDate = data.lastAffiliateValidationErrorTime[request.host];

						var timeDiff = Math.abs(nowDate - pastDate);
						var diffSeconds = Math.ceil(timeDiff / 1000); 	
						if(diffSeconds < serverData.globalConfig.timeIntervalInSecondToShowOnAffiliateLinks){
							//console.log('Not showing extension as this site is accessed using affiliate link in last 1 hr');
							return false;
						}
					}

					/*if(ribbon.dealOfTheDay){
						Storage.getLastShownDealofDay(function(lastShownDealofDay){
							if(lastShownDealofDay && lastShownDealofDay.lastShownDealofDay && lastShownDealofDay.lastShownDealofDay.deal){
								var lastShownDeal = lastShownDealofDay.lastShownDealofDay.deal;
								
								var currentDeal = serverData.dealOfDay;

								var nowDate = new Date().getTime();
								var pastDate = lastShownDealofDay.lastShownDealofDay.lastShownTime;

								var timeDiff = Math.abs(nowDate - pastDate);
								var diffSeconds = Math.ceil(timeDiff / 1000); 

								var dealMatched = lastShownDeal.coupanCode === currentDeal.coupanCode && lastShownDeal.coupanText === currentDeal.coupanText;
								if(dealMatched && request.autoLoad && diffSeconds < serverData.globalConfig.timeIntervalInSecondsToShowDealofDay){
									return false;
								}
							}
							
							if(request.autoLoad){
								Storage.setLastShownDealofDay(serverData.dealOfDay);
							}
							Background.tabWiseData[sender.tab.id].data = $.extend(serverData, settingsCheckboxValues, {'ribbon': ribbon});
							sendResponse(true);							
						});	
					}*/
					if(ribbon.showAvailableDeals || ribbon.noDealOnPartner || ribbon.showSimilarStores){
						chrome.storage.local.get('lastShownTimes', function(data){
							if(data.lastShownTimes && data.lastShownTimes[request.host] && !request.forceLoad){
								var nowDate = new Date().getTime();
								var pastDate = data.lastShownTimes[request.host];

								var timeDiff = Math.abs(nowDate - pastDate);
								var diffSeconds = Math.ceil(timeDiff / 1000); 	
								if(diffSeconds < serverData.globalConfig.timeIntervalInSecondToShowOnSameMerchant){
									return false;
								}
							}
							if(request.autoLoad){
								Storage.setLastShownTime(request.host);
							}
							Background.tabWiseData[sender.tab.id].data = $.extend(serverData, settingsCheckboxValues, {'ribbon': ribbon});
							sendResponse(true);	
						})
					}		
						
				})
	
			});
		}
		if(serverData && !serverData.showExtension && serverData.error === 'E001'){
			Storage.setLastAffiliateValidationErrorTime(request.host);
		}
	},
	messageListener: function(request, sender, sendResponse){
	
		switch(request.command){
			case "LOAD_DEALS" : {
				Background.loadDealsOnMerchant(request, sender, sendResponse);
				return true;
			}
			case "GET_DATA" : {
				if(Background.tabWiseData[sender.tab.id] && Background.tabWiseData[sender.tab.id].data){
					console.log(Background.tabWiseData[sender.tab.id].data,'data in eventpage.js')
					sendResponse	(Background.tabWiseData[sender.tab.id].data);
					return true;
				}
				return false;
			}
			case "CLOSE_IFRAME" : {
				chrome.tabs.sendMessage(sender.tab.id, {"command":"CLOSE_IFRAME"});
				return true;
			}
			case "OPEN_IFRAME_POPUP" : {
				chrome.tabs.sendMessage(sender.tab.id, {"command":"OPEN_IFRAME_POPUP"});
				return true;
			}
			case "SET_SETTINGS_CHECKBOX_VALUE" : {
				Storage.setSettingsCheckboxValue(request.checkboxName, request.value);
			}
			
		}
	},
	randomUUID: function(){
	  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
	    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	    return v.toString(16);
	  });
	}
}


// Listen for any changes to the URL of any tab.
//chrome.tabs.onUpdated.addListener(Background.checkForValidUrl);
//chrome.runtime.onMessage.addListener(Background.returnData);
chrome.runtime.onMessage.addListener(Background.messageListener);
// Check whether new version is installed
chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
       // console.log("This is a first install!");
        //Alarm.setDealOfDayAlarm();
        Storage.clearAll();
        Storage.setSettingsCheckboxValueDefaultValue();
        Storage.setUserId(Background.randomUUID());
        let url = chrome.extension.getURL ("index.html?type=carousel");
	    chrome.tabs.create({active:true , url : url});
    }else if(details.reason == "update"){
      
    }
});
chrome.pageAction.onClicked.addListener(function(tab) { 
	chrome.tabs.sendMessage(tab.id, {"command":"INVOKE_INIT","autoLoad":false, "forceLoad":true});
});
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.pageAction.show(tab.id);
});

/*chrome.alarms.onAlarm.addListener(function(alarm) {
	console.log("Alarm Triggered");
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, function(tabs){
          chrome.tabs.sendMessage(tabs[0].id, {"command":"INVOKE_INIT","autoLoad":false, "forceLoad":false, "dealOfDay":true});
	});
});*/
chrome.webRequest.onBeforeRequest.addListener(function(details){
	
	//console.log('onBeforeRequest'+ details.url + "type is" + details.type);
	var redirectArray = Background.redirects[details.tabId];
	if(!redirectArray){
		Background.redirects[details.tabId] = [];
	}
	Background.redirects[details.tabId].push(details.url);
		//console.log('onBeforeRequest'+ details.url + "type is: " + details.type);
	
},{urls: ["<all_urls>"], types: ["main_frame","object","ping","csp_report","other"]},[]);

