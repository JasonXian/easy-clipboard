import { combineReducers } from 'redux';
import {
    UPDATE_OPTIONS,
    OptionsActionTypes
} from './actions';

const options = ((state = {
    backgroundColor: "#FFFF99",
    textColor: "#000000",
    autoCopy: true,
    lineCount: 5,
}, action: OptionsActionTypes) => {
    switch (action.type) {
        case UPDATE_OPTIONS:
            return action.options
        default:
            return state
    }
});

export default combineReducers({
    options,
});
