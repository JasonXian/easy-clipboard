import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateClipboard } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobeAmericas } from '@fortawesome/free-solid-svg-icons';
import Searchbar from '../components/SearchBar';
import Note from '../components/Note';
import Modal from '../components/Modal';
import '../../../static/bootstrap.min.css';
import { IReduxStore } from '../../interfaces';
import './Clipboard.css';
import * as ClipboardJS from 'clipboard';

interface IClipboardProps {
    clipboard: string[],
    backgroundColor: string,
    textColor: string,
    lineCount: number,
    updateClipboard: (clipboard: string[]) => void;
}

interface IClipboardState {
    search: string,
    notification: string,
    hasModalOpen: boolean,
}

class Clipboard extends Component <IClipboardProps, IClipboardState> {

    constructor (props: IClipboardProps) {
        super(props);
        new ClipboardJS('.icon-copy');
        this.state = {
            search: '',
            notification: '',
            hasModalOpen: false,
        }
    }

    private removeAllNotes() {
        this.props.updateClipboard([]);
        this.setNotification('Deleted all notes!');
    }

    private setNotification (notification: string) {
        this.setState({
            notification,
        }, () => {
            setTimeout(() => {
                this.setState({ notification: '' });
            }, 1500);
        });
    }

    private writeURL () {
        window.chrome.tabs.query({ 
            active: true,
            currentWindow: true,
        }, tabs => {
            if (tabs[0] && tabs[0].url) this.writeToClipboard(tabs[0].url);
        });
    }

    private writeNote () {
        this.writeToClipboard(this.state.search);
    }

    private writeToClipboard (note: string) {
        const snippet = note.replace(/</g, '&lt;').replace(/>/g, '&gt;').trim();
        if (snippet.length == 0) return;
        const clipboard = this.props.clipboard;
        clipboard.unshift(snippet);
        this.props.updateClipboard(clipboard);
        this.setState({ search: '' });
        this.setNotification('Note Added!');
    }

    private removeFromClipboard (index: number) {
        const clipboard = this.props.clipboard.filter((text, i) => i != index);
        this.props.updateClipboard(clipboard);
        this.setNotification('Deleted!');
    }

    private mapClipboardToNotes (clipboard: string[]) {
        if (clipboard.length == 0) {
            return (
                <div>
                    <p style={{textAlign:'center'}}>
                        Saved text snippits will appear here!
                    </p>
                </div>  
            ) 
        }
        return clipboard.map((text, index) => (
            <Note
                backgroundColor={this.props.backgroundColor}
                key={index}
                text={text}
                lineCount={this.props.lineCount}
                onCopy={() => this.setNotification('Copied!')}
                onDelete={() => this.removeFromClipboard(index)}
            />
        ));
    }

    render () {
        const re = new RegExp(this.state.search);
        const clipboard = this.props.clipboard.filter(text => text.match(re) != null);
        const { search, notification } = this.state;
        return(
            <div>
                {
                    this.state.hasModalOpen &&
                    <Modal
                        label='Are you sure you want to delete all your notes? This action is irreversible.'
                        title='Delete All Notes?'
                        confirmText='Delete All'
                        onConfirm={() => {
                            this.removeAllNotes();
                            this.setState({ hasModalOpen: false });
                        }}
                        onExit={() => this.setState({ hasModalOpen: false })}
                    />
                }
                <div id="main-container">
                    <div id="header">
                        <h2 className='title'>
                            Easy Clipboard
                            <span className="title-line"></span>    
                        </h2>
                        <button
                            onClick={event => this.setState({ hasModalOpen: true, })}
                            className='eraser-button'
                        >
                            <FontAwesomeIcon icon='eraser' />
                        </button>
                        <button
                            onClick={event => chrome.runtime.openOptionsPage()}
                        >
                            <FontAwesomeIcon icon='cog' />
                        </button>
                    </div>
                    <Searchbar 
                        search={search}
                        onChange={(search: string) => this.setState({ search, })}
                    />
                    <div className='help-buttons-wrapper'>
                        <button
                            className="button-url"
                            onClick={event => this.writeURL()}
                        >
                            <FontAwesomeIcon icon={faGlobeAmericas} />
                            <h6>Save URL</h6>
                        </button>
                        {
                            (search != '') &&
                            <button
                                className="button-add-note"
                                onClick={event => this.writeNote()}
                            >
                                <FontAwesomeIcon icon='pencil-alt' />
                                <h6>Add to Clipboard</h6>
                            </button>
                        }
                    </div>
                    {
                        !(notification === '') &&
                        <p className='notification'>{notification}</p>
                    }
                    { this.mapClipboardToNotes(clipboard) }
                </div>
            </div>
        );
    }

}

const mapStateToProps = (state: IReduxStore) => ({
    clipboard: state.clipboard,
    backgroundColor: state.options.backgroundColor,
    textColor: state.options.textColor,
    lineCount: state.options.lineCount,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateClipboard: (clipboard: string[]) => dispatch(updateClipboard(clipboard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clipboard);
