import { Store } from 'redux';
import { IReduxStore } from '../interfaces';
import { updateClipboard } from '../redux/actions';
import store from '../redux/store';

class ContentScript {
    store: Store;

    constructor () {
        this.store = store;
    }
    
    public initContentScript () {
        document.addEventListener("copy", (event: ClipboardEvent) => {
            const state: IReduxStore = this.store.getState();
            const { clipboard, options } = state;
            if (options.autoCopy) {
                const selection = window.getSelection();
                if (selection) clipboard.push(selection.toString().replace(/</g, "&lt;").replace(/>/g, "&gt;"));
                this.store.dispatch(updateClipboard(clipboard));
            }
        });
    }

}

const contentScript = new ContentScript();
contentScript.initContentScript();
