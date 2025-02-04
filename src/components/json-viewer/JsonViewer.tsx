import { ChangeEvent, ReactElement, useState } from 'react';

import JsonOutput from '../../shared/json-viewer/JsonOutput';

export default function JsonViewer(): ReactElement {
    const [jsonInput, setJsonInput] = useState<string>('');
    const [jsonOutput, setJsonOutput] = useState<Record<
        string,
        unknown
    > | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [collapse, setCollapse] = useState<number | boolean>(10);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setJsonInput(e.target.value);
    };

    const formatJson = () => {
        try {
            const parsedJson = JSON.parse(jsonInput);
            setJsonOutput(parsedJson);
            setError(null);
        } catch (err) {
            setError('Invalid JSON format');
            setJsonOutput(null);
        }
    };

    const clearTextArea = () => {
        setJsonInput('');
        setJsonOutput(null);
        setError(null);
    };

    const collapseHandler = () => {
        setCollapse((prev) => !prev);
    };

    const copyToClipboard = () => {
        if (jsonOutput) {
            navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
        }
    };

    return (
        <div className="content-box">
            <h2 className="content-header">
                JSON Viewer
                <span>Paste and view your formated JSON</span>
            </h2>
            <div className="content">
                <div className="content-decoder">
                    <textarea
                        placeholder="Paste your JSON here..."
                        value={jsonInput}
                        onChange={handleInputChange}
                        className="textarea"
                    ></textarea>
                    <div className="button-container">
                        <div className="button-actions">
                            <button
                                onClick={formatJson}
                                className="format-button"
                            >
                                Format JSON
                            </button>
                            <button
                                onClick={clearTextArea}
                                className="clear-button"
                            >
                                Clear
                            </button>
                        </div>
                    </div>
                </div>

                <div className="json-viewer">
                    <JsonOutput
                        jsonOutput={jsonOutput}
                        error={error}
                        collapse={collapse}
                        collapseLabel={collapse ? 'Expand' : 'Collapse'}
                        collapseHandler={collapseHandler}
                        copyToClipboard={copyToClipboard}
                        copyJsonLabel="Copy JSON"
                    />
                </div>
            </div>
        </div>
    );
}
