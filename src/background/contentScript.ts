import { IChromeStorage } from '../interfaces';

class ContentScript {

    public initContentScript () {
        document.addEventListener("copy", (event: ClipboardEvent) => {
            chrome.storage.sync.get(["history", "autoCopy"], (storage: IChromeStorage) => {
                if (storage.autoCopy) {
                    if (!Array.isArray(storage.history)) storage.history = [];
                    let selection = window.getSelection();
                    if(selection) storage.history.push(selection.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                    chrome.storage.sync.set({
                        history: storage.history
                    });
                }
            });
        });
    }

}

export default new ContentScript();
