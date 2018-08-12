interface IStorage {
    history: Array<string>,
    bgColor: string,
    txtColor: string,
    autoCopy: boolean
}

(() => {
    chrome.storage.sync.get(null, (storage: IStorage) => {
        let bgColorInput = <HTMLInputElement> document.getElementById("bgColor");
        let txtColorInput = <HTMLInputElement> document.getElementById("txtColor");
        let autoCopyInput = <HTMLInputElement> document.getElementById("autoCopy");
        bgColorInput.value = storage.bgColor;
        txtColorInput.value = storage.txtColor;
        autoCopyInput.checked = storage.autoCopy;
        bgColorInput.addEventListener("change", () => {
            chrome.storage.sync.set({
                bgColor: bgColorInput.value
            })
        });
        txtColorInput.addEventListener("change", () => {
            chrome.storage.sync.set({
                txtColor: txtColorInput.value
            })
        });
        autoCopyInput.addEventListener("change", () => {
            chrome.storage.sync.set({
                autoCopy: autoCopyInput.checked
            })
        });
    });

})();