import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateClipboard } from '../../redux/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Searchbar from '../components/SearchBar';
import Note from '../components/Note';
import '../../../static/bootstrap.min.css';
import { IReduxStore } from '../../interfaces';
import './Clipboard.css';

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
}

class Clipboard extends Component <IClipboardProps, IClipboardState> {

    constructor (props: IClipboardProps) {
        super(props);
        this.state = {
            search: '',
            notification: '',
        }
    }

    private setNotification (notification: string) {
        this.setState({
            notification,
        }, () => {
            setTimeout(() => {
                this.setState({ notification: '' });
            }, 2000);
        });
    }

    private removeFromClipboard (index: number) {
        const clipboard = this.props.clipboard.filter((text, i) => i != index);
        this.props.updateClipboard(clipboard);
        this.setNotification('Deleted!');
    }

    private mapClipboardToNotes (clipboard: string[]) {
        if (clipboard.length == 0) {
            return <p style={{textAlign:'center'}}>Saved text snippits will appear here!</p>
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
        return(
            <div id="main-container">
                <div id="header">
                    <h2 className='title'>
                        Easy Clipboard
                        <span className="title-line"></span>    
                    </h2>
                    <button
                        onClick={event => chrome.runtime.openOptionsPage()}>
                        <FontAwesomeIcon icon='cog' />
                    </button>
                </div>
                <Searchbar 
                    search={this.state.search}
                    onChange={(search: string) => this.setState({ search, })}
                />
                <p className='notification'>{this.state.notification}</p>
                { this.mapClipboardToNotes(clipboard) }
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
