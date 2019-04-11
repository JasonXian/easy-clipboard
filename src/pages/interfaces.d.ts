export interface IChromeStorage extends IUserOptions {
    history: Array<string>,
}

export interface IReduxStore {
    history: Array<string>,
    options: IUserOptions,
}

export interface ICopiedData {
    content: string,
    date: Date,
    source: string,
}

export interface IUserOptions {
    backgroundColor: string,
    textColor: string,
    autoCopy: boolean,
    lineCount: number,
}