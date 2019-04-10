import * as React from 'react';
import { Component } from 'react';
import OptionsList from './containers/OptionsList';

class App extends Component {
    render(){
        return(
            <div>
                <OptionsList />
            </div>
        );
    }
}

export default App;