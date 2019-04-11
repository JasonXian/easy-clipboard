import { combineReducers } from 'redux';
import {
    UPDATE_OPTIONS,
    OptionsActionTypes,
    UPDATE_CLIPBOARD,
    ClipboardActionTypes
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

const clipboard = ((state = [], action: ClipboardActionTypes) => {
    switch (action.type) {
        case UPDATE_CLIPBOARD:
            return action.clipboard
        default:
            return state
    }
});

export default combineReducers({
    options,
    clipboard,
});
