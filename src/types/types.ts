export interface DecodedEntry {
    date: string;
    json: unknown;
}

export interface HistoryGroup {
    date: string;
    items: DecodedEntry[];
}
