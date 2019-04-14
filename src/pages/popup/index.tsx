import { render } from 'react-dom';
import { Provider } from 'react-redux';
import * as React from 'react';
import { Store } from 'webext-redux';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faSearch, faTrash, faCopy, faCog } from '@fortawesome/free-solid-svg-icons';
import App from './App';

library.add(faSearch, faTrash, faCopy, faCog)

const store = new Store({
    portName: 'easy-clipboard'
});

store.ready().then(() => {
    let mountNode = document.createElement('div');
    mountNode.id = 'root';
    document.body.appendChild(mountNode);
    render(
        <Provider store={store}>
            <App/>
        </Provider>
    , mountNode);
});