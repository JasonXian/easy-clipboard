import * as React from 'react';
import { Component } from 'react';

interface INoteProps {
    className: string,
    checked: boolean,
    label: string,
    onChange: (value: boolean) => void,
}

class Note extends Component <INoteProps> {

    constructor (props: INoteProps) {
        super(props);
    }

    render (){
        return(
            <div className={this.props.className}>
                <h3 id='notificationText'></h3>
                <div>
                    <i className='fas fa-search'></i>
                    <input type='text' id='search' />
                </div>
            </div>
        );
    }
}

export default Note;
