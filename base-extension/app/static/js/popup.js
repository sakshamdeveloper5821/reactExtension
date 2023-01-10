function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

chrome.runtime.sendMessage( {"command":'GET_DATA'}, function(data){
    entryFunction(data, getParameterByName('type'));
} );

window.openLinkInNewTabAndClose = function (url){
    chrome.tabs.create({active:false , url : url}, function(tab){       
        setTimeout(function(){
            chrome.tabs.remove(tab.id);
        }, 5000);
    });
}
window.openLinkNewTab = function (url){
    chrome.tabs.create({active:true , url : url});
}
window.openIframePopup = function (url){
    chrome.runtime.sendMessage( {"command":"OPEN_IFRAME_POPUP"});
}

window.closeIframeWindow = function (){
   chrome.runtime.sendMessage( {"command":"CLOSE_IFRAME"});
}
window.setSettingsCheckboxValue = function (checkboxName, value){
   chrome.runtime.sendMessage( {"command":"SET_SETTINGS_CHECKBOX_VALUE", "checkboxName":checkboxName,"value":value});
}
window.copyTextToClipBoard = function(text){
  var dummy = document.createElement("input");
  document.body.appendChild(dummy);
  dummy.setAttribute("id", "dummy_id");
  document.getElementById("dummy_id").value=text;
  dummy.select();
  document.execCommand("copy");
  document.body.removeChild(dummy);
}


//entryFunction(data);