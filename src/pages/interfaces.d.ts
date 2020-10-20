export interface IChromeStorage extends IUserOptions {
  clipboard: string[];
}

export interface IReduxStore {
  clipboard: string[];
  options: IUserOptions;
}

export interface ICopiedData {
  content: string;
  date: Date;
  source: string;
}

export interface IUserOptions {
  backgroundColor: string;
  textColor: string;
  autoCopy: boolean;
  lineCount: number;
}
