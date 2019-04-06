/// <reference path="./interfaces.d.ts" />

var contextMenuItem = {
    id : "easyCopy",
    title : "Copy to Easy Clipboard",
    contexts : ["selection"]
}

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId == "easyCopy" && clickData.selectionText) {
        chrome.storage.sync.get(["history"], (storage: IStorage) => {
            if (!Array.isArray(storage.history)) storage.history = [];
            storage.history.push(clickData.selectionText.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
            chrome.storage.sync.set({
                history: storage.history
            });
        });
    }
});

chrome.storage.onChanged.addListener((changeEvent, storageName) => {
    if (changeEvent.history) {
        chrome.browserAction.setBadgeText({
            "text" : `${changeEvent.history.newValue.length}`
        });
    } 
});