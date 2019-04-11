import * as React from 'react';
import { Component } from 'react';

interface IColorSelectorProps {
    className: string,
    color: string,
    label: string,
    onChange: (color: string) => void,
}

class ColorSelector extends Component <IColorSelectorProps> {

    constructor (props: IColorSelectorProps) {
        super(props);
        this.state = {
            color: this.props.color,
        }
    }

    render (){
        return(
            <div className={this.props.className}>
                <input 
                    type='color' 
                    value={this.props.color} 
                    onChange={event => this.props.onChange(event.target.value)}
                />
                <h3>{this.props.label}</h3>
            </div>
        );
    }
}

export default ColorSelector;
