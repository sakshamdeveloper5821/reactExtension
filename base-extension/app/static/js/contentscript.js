var ContentScript = {
	init: function(autoLoad, forceLoad){
		chrome.runtime.sendMessage( 
			{"command":"LOAD_DEALS", 
				url : window.location.href, 
				host: window.location.host,
				autoLoad: autoLoad,
				forceLoad: forceLoad
			}, 
			function(loadExtension){
				if(loadExtension)
					if(loadExtension.popup){
						ContentScript.openIframePopup();
					}
					if(loadExtension.ribbon){
						ContentScript.openIframeRibbon();
					}
			});
	},
	openIframePopup(){
		ContentScript.removeIframe();
		ContentScript.insertIframe('popup');

	},
	openIframeRibbon(){
		ContentScript.removeIframe();
		ContentScript.insertIframe('ribbon');

	},
	removeIframe: function(){
		 var frame = document.getElementById("shopforcause_iframe");
		 if(frame){
			 frame.parentNode.removeChild(frame);
		 }
	},
	insertIframe: function(type){
        var iFrame  = document.createElement ("iframe");
    	iFrame.id = 'shopforcause_iframe';
		iFrame.src  = chrome.extension.getURL ("index.html?type="+type);
		var width = window.innerWidth-420;
		iFrame.style.cssText = (type === 'popup'? ContentScript.getPopupIframeStyle() : ContentScript.getRibbonIframeStyle()) ;
		document.body.insertBefore (iFrame, document.body.firstChild);
	},
	getRibbonIframeStyle: function(){
		return 'position:fixed;top:0;display:block;width:100%;height:53px;z-index:99999999 !important';
	},
	getPopupIframeStyle: function(){
		return 'position:fixed;top:0;right:1px;display:block;width:415px;height:600px;z-index:99999999 !important';
	}

}
ContentScript.init(true,false);
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
	  switch(request.command){
		  	case "INVOKE_INIT" : {
				ContentScript.init(request.autoLoad, request.forceLoad);
				return true;
			}
			case "OPEN_IFRAME_POPUP" : {
				ContentScript.openIframePopup();
				return true;
			}
			case "CLOSE_IFRAME" : {
				ContentScript.removeIframe();
				return true;
			}
			case "GET_AMAZON_SMILE_PARTNER" : {
				callback(document.getElementById("nav-pldn-org-name").innerHTML);
			}
	  }
});