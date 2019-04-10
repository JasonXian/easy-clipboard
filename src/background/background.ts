import { createStore } from 'redux';
import { wrapStore } from 'webext-redux';
import contextMenu from './contextMenus';
import contentScript from './contentScript';
import reducers from '../redux/reducers';

const startupScripts = () => {
    contextMenu.initContextMenu();
    contentScript.initContentScript();
    const store = createStore(reducers);
    wrapStore(store, {
        portName: 'easy-clipboard',
    });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.runtime.openOptionsPage();
    startupScripts();
});

chrome.runtime.onStartup.addListener(startupScripts);