import { useEffect, useState } from 'react';

import Base64Input from './Base64Input';
import JsonOutput from './JsonOutput';
import History from './History';
import { decodeBase64String, groupByDay } from './utils';
import { DecodedEntry } from './types';

const MAX_HISTORY_LENGTH = 20;

function Base64Decoder() {
    const [base64Input, setBase64Input] = useState('');
    const [jsonOutput, setJsonOutput] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);
    const [collapse, setCollapse] = useState<boolean | number>(3);
    const [collapseLabel, setCollapseLabel] = useState<string>('Expand');
    const [copyJsonLabel, setCopyJsonLabel] = useState<string>('Copy JSON');
    const [history, setHistory] = useState<DecodedEntry[]>([]);
    const [collapseHistory, setCollapseHistory] = useState<boolean>(true);

    useEffect(() => {
        const storedHistory = localStorage.getItem('decodedHistory');
        if (storedHistory) {
            const parsedHistory = JSON.parse(storedHistory);
            setHistory(parsedHistory);
        }
    }, []);

    const decodeBase64 = () => {
        try {
            if (!base64Input) throw new Error('Empty input');
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
                    updatedHistory.shift(); // Remove the oldest entry (first element)
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

    const copyToClipboard = () => {
        if (jsonOutput) {
            navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
            setCopyJsonLabel('Copied');
            setTimeout(() => setCopyJsonLabel('Copy JSON'), 2000);
        }
    };

    const clearInput = () => {
        setBase64Input('');
        setJsonOutput(null);
        setError(null);
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem('decodedHistory');
    };

    const collapseHandler = () => {
        setCollapse((prev) => !prev);
        setCollapseLabel((prev) => (prev === 'Expand' ? 'Collapse' : 'Expand'));
    };

    const toggleCollapseHistory = () => {
        setCollapseHistory((prev) => !prev);
    };

    return (
        <div className="container">
            <div className="content-box">
                <h2>Base64 to JSON Decoder</h2>
                <div className="content">
                    <Base64Input
                        base64Input={base64Input}
                        setBase64Input={setBase64Input}
                        decodeBase64={decodeBase64}
                        clearInput={clearInput}
                    />
                    <JsonOutput
                        jsonOutput={jsonOutput}
                        error={error}
                        collapse={collapse}
                        collapseLabel={collapseLabel}
                        collapseHandler={collapseHandler}
                        copyToClipboard={copyToClipboard}
                        copyJsonLabel={copyJsonLabel}
                    />
                </div>

                <button
                    className="history-toggle"
                    onClick={toggleCollapseHistory}
                >
                    {collapseHistory ? 'Show History' : 'Hide History'}
                </button>

                {!collapseHistory && (
                    <History
                        history={groupByDay(history)}
                        clearHistory={clearHistory}
                    />
                )}
            </div>
        </div>
    );
}

export default Base64Decoder;
