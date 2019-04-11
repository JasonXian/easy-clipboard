import { wrapStore } from 'webext-redux';
import ContextMenu from './contextMenus';
import store from '../redux/store';
import { IChromeStorage } from '../interfaces';
import { updateOptions, updateClipboard } from '../redux/actions';

const startupScripts = (isFirst: boolean) => {
    wrapStore(store, {
        portName: 'easy-clipboard',
    });
    store.subscribe(() => {
        const { clipboard } = store.getState();
        chrome.browserAction.setBadgeText({
            text: `${clipboard.length}`,
        });
    });
    if (!isFirst) {
        chrome.storage.sync.get([
            'clipboard', 
            'backgroundColor',
            'textColor',
            'autoCopy',
            'lineCount'
        ], (result: IChromeStorage) => {
            const options = {
                backgroundColor: result.backgroundColor,
                textColor: result.textColor,
                autoCopy: result.autoCopy,
                lineCount: result.lineCount,
            }
            store.dispatch(updateClipboard(result.clipboard));
            store.dispatch(updateOptions(options));
        });
    }
    const contextMenu = new ContextMenu(store);
    contextMenu.initContextMenu();
}

chrome.runtime.onInstalled.addListener(() => {
    startupScripts(true);
    chrome.runtime.openOptionsPage();
});

// if chrome browser closes the state should be backed up from chrome storage, not defaults do a first install flag for startup scripts
chrome.runtime.onStartup.addListener(() => {
    startupScripts(false)
});