import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import contextMenu from './contextMenus';
import reducers from '../redux/reducers';

const startupScripts = () => {
    contextMenu.initContextMenu();
    const store = createStore(reducers);
    wrapStore(store, {
        portName: 'easy-clipboard',
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
    startupScripts();
});

// if chrome browser closes the state should be backed up from chrome storage, not defaults do a first install flag for startup scripts
chrome.runtime.onStartup.addListener(startupScripts);