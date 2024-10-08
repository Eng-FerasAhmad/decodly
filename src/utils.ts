import { DecodedEntry, HistoryGroup } from './types.ts';

export const decodeBase64String = (base64Input: string): any => {
    const decodedString = atob(base64Input);
    const utf8String = decodeURIComponent(
        decodedString.split('').map((char) => {
            return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
        }).join('')
    );

    return JSON.parse(utf8String);
};

export const groupByDay = (history: DecodedEntry[]): HistoryGroup[] => {
    return history.reduce((groups: HistoryGroup[], item: DecodedEntry) => {
        const date = new Date(item.date).toLocaleDateString('de-DE', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
        const group = groups.find(g => g.date === date);

        if (group) {
            group.items.push(item);
        } else {
            groups.push({ date, items: [item] });
        }

        groups.forEach(group => {
            group.items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
        });

        return groups;
    }, []).sort((a, b) => new Date(b.items[0].date).getTime() - new Date(a.items[0].date).getTime());
};