import * as React from 'react';
import { Component } from 'react';
import Clipboard from './containers/Clipboard';
import './App.css';

class App extends Component {
    render(){
        return(
            <div>
                <Clipboard />
            </div>
        );
    }
}

export default App;