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
            let containerNode: Element = document.createElement("div");
            let textNode: Element = document.createElement("h3");
            textNode.innerHTML = storage.history[i];
            textNode.className = "copiedText";
            let deleteNode: Element = document.createElement("a");
            deleteNode.className = "fas fa-trash-alt";
            deleteNode.addEventListener("click", (event) => {
                let target = <Element> event.target;
                let text = <Element> target.previousSibling;
                storage.history.splice(storage.history.indexOf(text.innerHTML), 1);
                chrome.storage.sync.set({
                    history: storage.history
                }, () => {
                    target.remove();
                    text.remove();
                });
            });
            containerNode.appendChild(textNode);
            containerNode.appendChild(deleteNode);
            content.appendChild(containerNode);
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