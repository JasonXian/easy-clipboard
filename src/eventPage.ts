var contextMenuItem = {
    "id" : "spendMoney",
    "title" : "SpendMoney",
    "contexts" : ["selection"]
}
chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener((clickData) => {
    if (clickData.menuItemId == "spendMoney" && clickData.selectionText) {
        if (typeof(parseInt(clickData.selectionText)) == "number") {
            chrome.storage.sync.get(["total", "limit"], (budget) => {
                var newTotal = 0;
                if (budget.total) {
                    newTotal += parseInt(clickData.selectionText);
                }
                newTotal += parseInt(clickData.selectionText);
                chrome.storage.sync.set({
                    "total" : newTotal
                }, () => {
                    if (newTotal >= budget.limit) {
                        var notification = {
                            type: "basic",
                            iconUrl: "icon48.png",
                            title: "Limit reached!",
                            message: "Oops! You spent over your limit!"
                        }
                        chrome.notifications.create("limitNotification", notification);
                    }
                });
            });
        }
    }
});

chrome.storage.onChanged.addListener((changeEvent, storageName) => {
    chrome.browserAction.setBadgeText({
        "text" : changeEvent.total.newValue.toString()
    });
});