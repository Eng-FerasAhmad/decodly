export interface DecodedEntry {
    date: string;
    json: any;
}

export interface HistoryGroup {
    date: string;
    items: DecodedEntry[];
}