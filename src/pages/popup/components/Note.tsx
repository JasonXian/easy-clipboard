import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Note.css';

interface INoteProps {
    backgroundColor: string,
    text: string,
    lineCount: number,
    onCopy: () => void,
    onDelete: () => void,
}

interface INoteState {
    isDisplayingMore: boolean,
}

class Note extends Component <INoteProps, INoteState> {
    
    private copyInput: React.RefObject<HTMLInputElement>;
    private lineLength = 26;

    constructor (props: INoteProps) {
        super(props);
        this.copyInput = React.createRef();
        this.state = {
            isDisplayingMore: false,
        }
    }

    private onCopy () {
        const copyInput = this.copyInput.current;
        if(copyInput) copyInput.select();
        document.execCommand("copy");
        this.props.onCopy();
    }

    render () {
        const inputStyle = {
            backgroundColor: this.props.backgroundColor,
        }
        const displayText = this.state.isDisplayingMore ? this.props.text : this.props.text.substring(0, this.props.lineCount * this.lineLength);
        return(
            <div className='container'>
                <div>
                    <div>
                        <p>{displayText}</p>
                        {
                            this.props.text.length > this.props.lineCount * this.lineLength &&
                            <p 
                                className='display-more-text'
                                onClick={event => this.setState({ isDisplayingMore: !this.state.isDisplayingMore })}
                            >
                                { this.state.isDisplayingMore ? '...see less': '...see more' }
                            </p>
                        }
                    </div>
                    <input
                        className='input-copy'
                        type='text'
                        style={inputStyle}
                        value={this.props.text}
                        ref={this.copyInput}
                        readOnly={true}
                    />
                </div>
                <div onClick={event => this.onCopy()} >
                    <FontAwesomeIcon icon='copy' className='icon-copy' />
                </div>
                <div onClick={event => this.props.onDelete()} >
                    <FontAwesomeIcon icon='trash' className='icon-trash' />
                </div>
            </div>
        );
    }
}

export default Note;
