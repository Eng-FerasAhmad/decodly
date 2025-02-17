import { useState } from 'react';

export default function useJsonFormatter() {
    const [jsonOutput, setJsonOutput] = useState<Record<
        string,
        unknown
    > | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [collapse, setCollapse] = useState<number | boolean>(10);

    const formatJson = (jsonInput: string) => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            setJsonOutput(parsedJson);
            setError(null);
        } catch {
            setError('Invalid JSON format');
            setJsonOutput(null);
        }
    };

    const clearResults = () => {
        setJsonOutput(null);
        setError(null);
    };

    const collapseHandler = () => {
        setCollapse((prev) => !prev);
    };

    return {
        jsonOutput,
        error,
        collapse,
        formatJson,
        clearResults,
        collapseHandler,
    };
}
