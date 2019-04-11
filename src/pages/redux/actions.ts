import { IUserOptions } from '../interfaces';

export const UPDATE_OPTIONS = 'UPDATE_OPTIONS';

interface IUpdateOptionsAction {
    type: typeof UPDATE_OPTIONS,
    options: IUserOptions,
}

export type OptionsActionTypes = IUpdateOptionsAction;

export const updateOptions = (options: IUserOptions) => {
    chrome.storage.sync.set(options, () => {
        return {
            type: UPDATE_OPTIONS,
            options,
        }
    });
};
