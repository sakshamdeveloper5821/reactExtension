const sendEvent = (action)=>{
      var eventCategory = chrome.runtime.getManifest().author;
      ga('send', 'event', eventCategory, action);
}
const Analytics = {
  sendEvent
}
export default Analytics;