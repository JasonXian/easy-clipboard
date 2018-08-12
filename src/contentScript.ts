interface IStorage {
    history: Array<string>,
    bgColor: string,
    txtColor: string,
    autoCopy: boolean
}

(() => {
    document.addEventListener("copy", (event: ClipboardEvent) => {
        chrome.storage.sync.get(["history", "autoCopy"], (storage: IStorage) => {
            if (storage.autoCopy) {
                if (!Array.isArray(storage.history)) storage.history = [];
                storage.history.push(window.getSelection().toString().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                chrome.storage.sync.set({
                    history: storage.history
                });
            }
        });
    });
})();