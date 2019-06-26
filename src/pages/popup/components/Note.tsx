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
    
    private lineLength = 28;

    constructor (props: INoteProps) {
        super(props);
        this.state = {
            isDisplayingMore: false,
        }
    }

    render () {
        const displayText = this.state.isDisplayingMore ? this.props.text : this.props.text.substring(0, this.props.lineCount * this.lineLength);
        return(
            <div className='note-container'>
                <div className="note-text">
                    <p>{displayText}</p>
                    {
                        this.props.text.length > this.props.lineCount * this.lineLength &&
                        <p 
                            className='display-more-text'
                            onClick={event => this.setState({ isDisplayingMore: !this.state.isDisplayingMore })}>
                            { this.state.isDisplayingMore ? '... Show less': '... Show more' }
                        </p>
                    }
                </div>
                <div className="note-buttons">
                    <button className='icon-trash' onClick={event => this.props.onDelete()} >
                        <FontAwesomeIcon icon='trash' />
                    </button>
                    <button className='icon-copy' data-clipboard-text={this.props.text}>
                        <FontAwesomeIcon icon='copy' />
                    </button>
                </div>
            </div>
        );
    }
}

export default Note;
