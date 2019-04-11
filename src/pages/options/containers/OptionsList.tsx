import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import ColorSelector from '../components/ColorSelector';
import CheckBox from '../components/CheckBox';
import NumberSelector from '../components/NumberSelector';
import { updateOptions } from '../../redux/actions';
import { IReduxStore, IUserOptions } from '../../interfaces';
import '../../../static/bootstrap.min.css';
import './OptionsList.css';

interface IOptionsListProps {
    options: IUserOptions,
    updateOptions: (options: IUserOptions) => void,
}

class OptionsList extends Component <IOptionsListProps> {

    constructor (props: IOptionsListProps) {
        super(props);
    }

    onColorChange (key: string, color: string) {
        let options = this.props.options;
        options[key] = color;
        this.props.updateOptions(options);
    }

    onCheckBoxChange (key: string, value: boolean) {
        let options = this.props.options;
        options[key] = value;
        this.props.updateOptions(options);
    }

    onNumberSelectorChange (key: string, number: number) {
        let options = this.props.options;
        options[key] = number;
        this.props.updateOptions(options);
    }
    
    render () {
        return(
            <div className='container'>
                <h1 className='mt-5'>Easy Clipboard Options</h1>
                <hr/>
                <ColorSelector
                    className='options'
                    color={this.props.options.backgroundColor}
                    label='Background Color'
                    onChange={(color) => this.onColorChange('backgroundColor', color)}
                />
                <ColorSelector
                    className='options'
                    color={this.props.options.textColor}
                    label='Text Color'
                    onChange={(color) => this.onColorChange('textColor', color)}
                />
                <CheckBox 
                    className='options'
                    checked={this.props.options.autoCopy}
                    label='Automatically copy to Easy Clipboard when using CTRL+C (Windows) or CMD+C (OSX) or (Right Click > Copy)'
                    onChange={(value) => this.onCheckBoxChange('autoCopy', value)}
                />
                <NumberSelector
                    className='options'
                    lineCount={this.props.options.lineCount}
                    label='Number of lines shown in preview for each stored copy'
                    onChange={(lineCount) => this.onNumberSelectorChange('lineCount', lineCount)}
                />
            </div>
        );
    }
}

const mapStateToProps = (state: IReduxStore) => ({
    options: state.options,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateOptions: (options: IUserOptions) => dispatch(updateOptions(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList);
