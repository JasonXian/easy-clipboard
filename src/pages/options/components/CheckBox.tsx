import * as React from 'react';
import { Component } from 'react';

interface ICheckBoxProps {
    className: string,
    checked: boolean,
    label: string,
    onChange: (value: boolean) => void,
}

class CheckBox extends Component <ICheckBoxProps> {

    constructor (props: ICheckBoxProps) {
        super(props);
    }

    render (){
        return(
            <div className={this.props.className}>
                <input 
                    type='checkbox' 
                    checked={this.props.checked}
                    onChange={event => this.props.onChange(event.target.checked)}
                />
                <h3>{this.props.label}</h3>
            </div>
        );
    }
}

export default CheckBox;
