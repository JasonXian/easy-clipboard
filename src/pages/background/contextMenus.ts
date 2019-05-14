import { Store } from 'webext-redux';
import { IReduxStore } from '../interfaces';
import { updateClipboard } from '../redux/actions';

class ContextMenu {
    store: Store;

    constructor (store) {
        this.store = store;
    }

    public initContextMenu () {
        chrome.contextMenus.create({
            id: "easyCopy",
            title: "Copy to Easy Clipboard",
            contexts: ["selection"],
        });
        chrome.contextMenus.onClicked.addListener((clickData) => {
            if (clickData.menuItemId == "easyCopy" && clickData.selectionText) {
                const state: IReduxStore = this.store.getState();
                const { clipboard } = state;
                if (clickData.selectionText) clipboard.unshift(clickData.selectionText.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                this.store.dispatch(updateClipboard(clipboard));
            }
        });
    }

}

export default ContextMenu;
