import { useState } from 'react';

import { decodeBase64String } from 'utils/utils';
import { DecodedEntry } from 'types/types';
import { useApp } from 'src/context/AppContext';

const MAX_HISTORY_LENGTH = 20;

export default function useBase64Decoder() {
    const [history, setHistory] = useState<DecodedEntry[]>([]);
    const { base64Input, setError, setJsonOutput } = useApp();

    const decodeBase64 = () => {
        try {
            if (!base64Input.trim()) throw new Error('Empty input');
            const json = decodeBase64String(base64Input);
            const newEntry: DecodedEntry = {
                date: new Date().toISOString(),
                json,
            };

            const isDuplicate = history.some(
                (entry) =>
                    JSON.stringify(entry.json) === JSON.stringify(newEntry.json)
            );

            if (!isDuplicate) {
                const updatedHistory = [...history, newEntry];

                if (updatedHistory.length > MAX_HISTORY_LENGTH) {
                    updatedHistory.shift();
                }

                setHistory(updatedHistory);
                localStorage.setItem(
                    'decodedHistory',
                    JSON.stringify(updatedHistory)
                );
            } else {
                setError('This entry already exists in history.');
            }

            setJsonOutput(json);
            setError(null);
        } catch (err) {
            setError('Invalid Base64 or JSON format');
            setJsonOutput(null);
        }
    };

    const clearResults = () => {
        setJsonOutput(null);
        setError(null);
    };

    return { decodeBase64, clearResults };
}
