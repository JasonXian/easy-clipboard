(() => {
    chrome.storage.sync.get("limit", (budget) => {
        (<HTMLInputElement> document.getElementById("limit")).value = budget.limit;
    });
    document.getElementById("save").addEventListener("click", () => {
        chrome.storage.sync.set({
            limit: parseInt((<HTMLInputElement> document.getElementById("limit")).value)
        });
        (<HTMLInputElement> document.getElementById("limit")).value = "";
        close();
    });
    document.getElementById("reset").addEventListener("click", () => {
        chrome.storage.sync.set({
            total: 0
        });
        (<HTMLInputElement> document.getElementById("limit")).value = "";
        close();
    });
})();