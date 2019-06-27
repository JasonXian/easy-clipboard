import { IChromeStorage } from "../interfaces";

class ContentScript {
    public initContentScript () {
        document.addEventListener('copy', (event: ClipboardEvent) => {
            chrome.storage.sync.get(['autoCopy'], (result: IChromeStorage) => {
                if (result.autoCopy) {
                    const selection = window.getSelection();
                    if (selection) {
                        chrome.runtime.sendMessage({
                            selection: selection.toString().replace(/</g, '&lt;').replace(/>/g, '&gt;').trim(),
                        });
                    }
                }
            });
        });
    }

}

const contentScript = new ContentScript();
contentScript.initContentScript();
