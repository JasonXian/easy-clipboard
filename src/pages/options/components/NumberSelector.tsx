import * as React from 'react';
import { Component } from 'react';
import './NumberSelector.css';

interface INumberSelectorProps {
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
            <React.Fragment>
                <span className="number-selector">
                    <button className="decrease-btn">-</button>
                    <input
                        className="number-input"
                        type='number'
                        min='1'
                        value={this.props.lineCount}
                        onChange={event => this.props.onChange(event.target.valueAsNumber)}
                    />
                    <button className="increase-btn">+</button>
                </span>
                <h6 className="number-selector-text">{this.props.label}</h6>
            </React.Fragment>
        );
    }
}

export default NumberSelector;
