import * as React from 'react';
import { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

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
            <div>
                <div>
                    <FontAwesomeIcon icon='search' />
                    <input 
                        type='text'
                        value={this.props.search}
                        onChange={event => this.props.onChange(event.target.value)}
                    />
                </div>
            </div>
        );
    }
}

export default SearchBar;