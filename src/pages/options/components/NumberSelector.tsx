import * as React from 'react';
import { Component } from 'react';

interface INumberSelectorProps {
    className: string,
    lineCount: number,
    label: string,
    onChange: (lineCount: number) => void,
}

class NumberSelector extends Component <INumberSelectorProps> {

    constructor (props: INumberSelectorProps) {
        super(props);
    }

    render (){
        return(
            <div className={this.props.className}>
                <input 
                    type='number'
                    min='1'
                    value={this.props.lineCount}
                    onChange={event => this.props.onChange(event.target.valueAsNumber)}
                />
                <h3>{this.props.label}</h3>
            </div>
        );
    }
}

export default NumberSelector;
