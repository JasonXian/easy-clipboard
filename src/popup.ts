(() => {

    interface IStorage {
        history: Array<string>
    }

    interface ICopiedData {
        content: string,
        date: Date,
        source: string,
    }
    
    chrome.storage.sync.get(["history"], (storage: IStorage) => {
        if (!Array.isArray(storage.history)) {
            chrome.storage.sync.set({
                history: []
            })
        }
        let content: Node = document.getElementById("content");
        for (let i = storage.history.length - 1; i >= 0; i--) {
            let containerNode:HTMLElement = document.createElement("div");
            let buttonContainerNode:HTMLElement = document.createElement("div");
            let textNode:HTMLElement = document.createElement("h3");
            let deleteNode:HTMLAnchorElement = document.createElement("a");
            let copyButtonNode:HTMLAnchorElement = document.createElement("a");
            let copyInputNode: HTMLInputElement = document.createElement("input");
            let text: string = storage.history[i];
            textNode.innerHTML = text.length > 200 ? text.substring(0,150) : text;
            textNode.className = "copiedText";
            if (text.length > 200) setDisplayText(textNode, text);
            deleteNode.className = "fas fa-trash-alt";
            deleteNode.addEventListener("click", (event) => {
                let target = <HTMLElement> event.target;
                let deleteTextNode = <HTMLElement> target.parentElement.previousElementSibling;
                let displayNode = <HTMLElement> target.parentElement.parentElement;
                storage.history.splice(storage.history.indexOf(deleteTextNode.innerHTML), 1);
                chrome.storage.sync.set({
                    history: storage.history
                }, () => {
                    displayNode.remove();
                    displayNotification("Deleted!", "red");
                });
            });
            copyInputNode.setAttribute("readonly", "true");
            copyInputNode.className = "copyInput";
            copyInputNode.value = text;
            copyButtonNode.className = "fas fa-copy";
            copyButtonNode.addEventListener("click", () => {
                copyInputNode.select();
                document.execCommand("copy");
                displayNotification("Copied!", "green");
            });
            containerNode.appendChild(textNode);
            containerNode.appendChild(buttonContainerNode);
            buttonContainerNode.className = "buttonContainer";
            buttonContainerNode.appendChild(copyButtonNode);
            buttonContainerNode.appendChild(deleteNode);
            buttonContainerNode.appendChild(copyInputNode);
            content.appendChild(containerNode);
        }
        chrome.browserAction.setBadgeText({
            "text" : `${storage.history.length}`
        }); 
    });

    const displayNotification = (text: string, color: string) => {
        let notification = <HTMLElement> document.getElementById("notificationText");
        notification.innerHTML = text;
        notification.style.color = color;
        setTimeout(() => {
            notification.innerHTML = "";
        }, 2000);
    }

    const setDisplayText = (textNode: HTMLElement, text: string) => {
        let displayMoreNode: HTMLAnchorElement = document.createElement("a");
        displayMoreNode.className = "displayMore";
        displayMoreNode.innerHTML = " ...more";
        displayMoreNode.addEventListener("click", () => {
            if (displayMoreNode.innerHTML == " ...more") {
                textNode.innerHTML = text;
                displayMoreNode.innerHTML = " less";
            } else {
                textNode.innerHTML = text.substring(0,150);
                displayMoreNode.innerHTML = " ...more";
            }
            textNode.appendChild(displayMoreNode);
        });
        textNode.appendChild(displayMoreNode);
    }

})();