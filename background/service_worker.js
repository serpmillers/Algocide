chrome.runtime.onInstalled.addListener(()=>{
    console.log("Algocide installed");

    chrome.storage.local.set({
        config:{
            feedLimit:20,
            blockRecommendations:true
        }
    });
});
