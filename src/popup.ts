/// <reference path="./interfaces.d.ts" />

(() => {
    chrome.storage.sync.get(null, (storage: IStorage) => {
        startHistory(storage);
        let search = <HTMLInputElement> document.getElementById("search");
        search.addEventListener("input", () => {
            clearPopups();
            if(search.value != ""){
                let re: RegExp = new RegExp(search.value);
                let filteredStorage: IStorage = {
                    ...storage,
                    history: storage.history.filter((text: string) => text.match(re) != null),
                }
                displayPopups(filteredStorage);
            } else {
                displayPopups(storage);
            }
        });
        setUpDefaults(storage); 
        displayPopups(storage);
    });

    const startHistory = (storage: IStorage) => {
        if (!Array.isArray(storage.history)) {
            chrome.storage.sync.set({
                history: []
            })
        }
        if (!storage.bgColor) {
            chrome.storage.sync.set({
                bgColor: "#FFFF99"
            })
        }
        if (!storage.bgColor) {
            chrome.storage.sync.set({
                txtColor: "#000000"
            })
        }
        if (!storage.bgColor) {
            chrome.storage.sync.set({
                autoCopy: true
            })
        }
        if (!storage.lineCount) {
            chrome.storage.sync.set({
                lineCount: 5
            })
        }
    }

    const setUpDefaults = (storage: IStorage) => {
        let background = <HTMLBodyElement> document.getElementById("body");
        background.style.backgroundColor = storage.bgColor || "#FFFF99";
        background.style.color = storage.txtColor || "#000000";
        let header = <HTMLDivElement> document.getElementById("header");
        header.style.backgroundColor =storage.bgColor || "#FFFF99";
    }

    const displayPopups = (storage: IStorage) => {
        const LINELENGTH = 26;
        let content: Node = document.getElementById("content");
        for (let i = storage.history.length - 1; i >= 0; i--) {
            let containerNode:HTMLElement = document.createElement("div");
            let buttonContainerNode:HTMLElement = document.createElement("div");
            let textNode:HTMLElement = document.createElement("h3");
            let deleteNode:HTMLAnchorElement = document.createElement("a");
            let copyButtonNode:HTMLAnchorElement = document.createElement("a");
            let copyInputNode: HTMLInputElement = document.createElement("input");
            let text: string = storage.history[i];
            textNode.innerHTML = text.substring(0, storage.lineCount * LINELENGTH);
            textNode.className = "copiedText";
            if (text.length > storage.lineCount * LINELENGTH) setDisplayText(textNode, text, storage.lineCount, LINELENGTH);
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
            copyInputNode.style.backgroundColor = storage.bgColor;
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
    }

    const clearPopups = () => {
        let content: Node = document.getElementById("content");
        while (content.firstChild) {
            content.removeChild(content.firstChild);
        }
    }

    const displayNotification = (text: string, color: string) => {
        let notification = <HTMLElement> document.getElementById("notificationText");
        notification.innerHTML = text;
        notification.style.color = color;
        setTimeout(() => {
            notification.innerHTML = "";
        }, 2000);
    }

    const setDisplayText = (textNode: HTMLElement, text: string, lineCount: number, LINELENGTH: number) => {
        let displayMoreNode: HTMLAnchorElement = document.createElement("a");
        displayMoreNode.className = "displayMore";
        displayMoreNode.innerHTML = " ...more";
        displayMoreNode.addEventListener("click", () => {
            if (displayMoreNode.innerHTML == " ...more") {
                textNode.innerHTML = text;
                displayMoreNode.innerHTML = " less";
            } else {
                textNode.innerHTML = text.substring(0, lineCount * LINELENGTH);
                displayMoreNode.innerHTML = " ...more";
            }
            textNode.appendChild(displayMoreNode);
        });
        textNode.appendChild(displayMoreNode);
    }
})();