import * as React from 'react';
import { Component } from 'react';
import '../static/bootstrap.min.css';
import './OptionsList.css';

class OptionsList extends Component {
    render(){
        return(
            <div className='container'>
                <h1 className='mt-5'>Easy Clipboard Options</h1>
                <hr/>
                <div className='options'>
                    <input type='color' id='bgColor'/>
                    <h3>Background Color</h3>
                </div>
                <div className='options'>
                    <input type='color' id='txtColor'/>
                    <h3>Text Color</h3>
                </div>
                <div className='options'>
                    <input type='checkbox' id='autoCopy'/>
                    <h3>Automatically copy to Easy Clipboard when using CTRL+C (Windows) or CMD+C (OSX) or (Right Click > Copy)</h3>
                </div>
                <div className='options'>
                    <input type='number' id='lineCount' min='1'/>
                    <h3>Number of lines shown in preview for each stored copy</h3>
                </div>
            </div>
        );
    }
}

export default OptionsList;