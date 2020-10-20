import { IUserOptions } from "../interfaces";

// Options Actions
export const UPDATE_OPTIONS = "UPDATE_OPTIONS";

interface IUpdateOptionsAction {
  type: typeof UPDATE_OPTIONS;
  options: IUserOptions;
}

export type OptionsActionTypes = IUpdateOptionsAction;

export const updateOptions = (options: IUserOptions) => {
  chrome.storage.sync.set(options);
  return {
    type: UPDATE_OPTIONS,
    options,
  };
};

// Clipboard Actions
export const UPDATE_CLIPBOARD = "UPDATE_CLIPBOARD";

interface IUpdateClipboardAction {
  type: typeof UPDATE_CLIPBOARD;
  clipboard: string[];
}

export type ClipboardActionTypes = IUpdateClipboardAction;

export const updateClipboard = (clipboard: string[]) => {
  chrome.storage.sync.set({ clipboard });
  return {
    type: UPDATE_CLIPBOARD,
    clipboard,
  };
};
