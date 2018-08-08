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
            let containerNode: Element = document.createElement("div");
            let buttonContainerNode: Element = document.createElement("div");
            let textNode: Element = document.createElement("h3");
            let deleteNode: Element = document.createElement("a");
            let copyButtonNode: Element = document.createElement("a");
            let copyInputNode: HTMLInputElement = document.createElement("input");
            let text: string = storage.history[i];
            textNode.innerHTML = text.length > 200 ? `${text.substring(0,200)} ...` : text.substring(0,200);
            textNode.className = "copiedText";
            deleteNode.className = "fas fa-trash-alt";
            deleteNode.addEventListener("click", (event) => {
                let target = <Element> event.target;
                let deleteTextNode = <Element> target.parentElement.previousElementSibling;
                let displayNode = <Element> target.parentElement.parentElement;
                storage.history.splice(storage.history.indexOf(deleteTextNode.innerHTML), 1);
                chrome.storage.sync.set({
                    history: storage.history
                }, () => {
                    displayNode.remove();
                });
            });
            copyInputNode.setAttribute("readonly", "true");
            copyInputNode.className = "copyInput";
            copyInputNode.value = text;
            copyButtonNode.className = "fas fa-copy";
            copyButtonNode.addEventListener("click", () => {
                copyInputNode.select();
                document.execCommand("copy");
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
})();