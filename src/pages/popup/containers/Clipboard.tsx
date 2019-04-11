import * as React from 'react';
import { Component } from 'react';
import { connect } from 'react-redux';
import { updateClipboard } from '../../redux/actions';
import Searchbar from '../components/SearchBar';
import Note from '../components/Note';
import '../../../static/bootstrap.min.css';
import './Clipboard.css';
import { IReduxStore } from '../../interfaces';

interface IClipboardProps {
    clipboard: string[],
    updateClipboard: (clipboard: string[]) => void;
}

interface IClipboardState {
    search: string,
}

class Clipboard extends Component <IClipboardProps, IClipboardState> {

    constructor (props: IClipboardProps) {
        super(props);
        this.state = {
            search: '',
        }
    }

    render () {
        return(
            <div>
                <h2>Easy Clipboard</h2>
                <Searchbar 
                    search={this.state.search}
                    onChange={(search: string) => this.setState({ search, })}
                />
            </div>
        );
    }

}

const mapStateToProps = (state: IReduxStore) => ({
    clipboard: state.clipboard,
});

const mapDispatchToProps = (dispatch: any) => ({
    updateClipboard: (clipboard: string[]) => dispatch(updateClipboard(clipboard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Clipboard);
