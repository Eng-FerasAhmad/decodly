import { useState } from 'react';

export function useExtractor<T, P extends unknown[]>() {
    const [jsonOutput, setJsonOutput] = useState<T | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const handleExtract = (
        extractFunction: (...args: P) => T | void,
        ...args: P
    ) => {
        try {
            const result = extractFunction(...args);

            if (result !== undefined && result !== null) {
                setJsonOutput(result);
                if (Array.isArray(result)) {
                    setTotalCount(result.length);
                } else {
                    setTotalCount(0);
                }
                setError(null);
            } else {
                setJsonOutput(null);
                setTotalCount(0);
                setError('No data extracted.');
            }
        } catch (err) {
            setError('An error occurred during extraction.');
            setJsonOutput(null);
        }
    };

    const clearResults = () => {
        setJsonOutput(null);
        setTotalCount(0);
        setError(null);
    };

    return { jsonOutput, error, totalCount, handleExtract, clearResults };
}
