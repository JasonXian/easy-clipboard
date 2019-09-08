import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './SearchBar.css';

interface ISearchBarProps {
    search: string,
    onChange: (search: string) => void,
}

class SearchBar extends Component <ISearchBarProps> {

    constructor (props: ISearchBarProps) {
        super(props);
    }

    render (){
        return(
            <div className='search-wrapper'>
                <FontAwesomeIcon icon='search' />
                <input
                    className="search-input"
                    type="text"
                    placeholder="Search or Add Notes..."
                    value={this.props.search}
                    onChange={event => this.props.onChange(event.target.value)}
                />
            </div>
        );
    }
}

export default SearchBar;
