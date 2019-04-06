interface IStorage {
    history: Array<string>,
    bgColor: string,
    txtColor: string,
    autoCopy: boolean,
    lineCount: number
}

interface ICopiedData {
    content: string,
    date: Date,
    source: string,
}