/// <reference path="./interfaces.d.ts" />

(() => {
    chrome.storage.sync.get(null, (storage: IStorage) => {
        let bgColorInput = <HTMLInputElement> document.getElementById("bgColor");
        let txtColorInput = <HTMLInputElement> document.getElementById("txtColor");
        let autoCopyInput = <HTMLInputElement> document.getElementById("autoCopy");
        let lineCountInput = <HTMLInputElement> document.getElementById("lineCount");
        bgColorInput.value = storage.bgColor;
        txtColorInput.value = storage.txtColor;
        autoCopyInput.checked = storage.autoCopy;
        lineCountInput.value = `${storage.lineCount}`;
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
        lineCountInput.addEventListener("change", () => {
            let lineNumber = parseInt(lineCountInput.value);
            if (lineNumber) {
                chrome.storage.sync.set({
                    lineCount: lineNumber
                })
            } else {
                lineCountInput.value = `${storage.lineCount}`
            }
        });
    });

})();