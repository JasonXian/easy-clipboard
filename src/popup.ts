(() => {
    /*
    chrome.storage.sync.get(["total", "limit"], (budget) => {
        document.getElementById("spent").innerHTML = budget.total;
        document.getElementById("limit").innerHTML = budget.limit;
    });
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
    document.getElementById("content").appendChild
})();