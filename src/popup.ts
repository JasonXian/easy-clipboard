(() => {

    interface IStorage {
        history: Array<string>
    }
    
    chrome.storage.sync.get(["history"], (storage: IStorage) => {
        if (!Array.isArray(storage.history)) {
            chrome.storage.sync.set({
                history: []
            })
        }
        let content: Node = document.getElementById("content");
        for (let i = 0; i < storage.history.length; i++) {
            let node: Element = document.createElement("h3");
            node.innerHTML = storage.history[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");
            content.appendChild(node);
        }    
    });
    /*
    document.getElementById("spend").addEventListener("click", () => {
        chrome.storage.sync.get(["total", "limit"], (budget) => {
            let newTotal = 0;

            if (budget.total) newTotal += parseInt(budget.total);

            let amount = document.getElementById("amount").value;

            if (amount) newTotal += parseInt(amount);

            chrome.storage.sync.set({
                "total" : newTotal
            }, () => {
                if (newTotal > budget.limit) {
                    var notification = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Oops! You spent over your limit!"
                    }
                    chrome.notifications.create("limitNotification", notification);
                }
            });
    
            document.getElementById("spent").innerHTML = newTotal;
            document.getElementById("amount").value = "";
        });
    });
    */
})();