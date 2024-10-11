import { ChangeEvent, ReactElement, useState } from 'react';

import './html-extractor.css';
import JsonOutput from '../JsonOutput';

interface DataIdAttributes {
    [key: string]: {
        dataAttributes: { [key: string]: any };
    };
}

export default function DataIdExtractor(): ReactElement {
    const [htmlInput, setHtmlInput] = useState<string>('');
    const [jsonOutput, setJsonOutput] = useState<DataIdAttributes | null>(null);
    const [collapse, setCollapse] = useState<number | boolean>(10);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlInput(e.target.value);
    };

    const extractDataIds = () => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const allElements = doc.querySelectorAll('*'); // Select all elements
            const dataAttributes: DataIdAttributes = {};

            allElements.forEach((element) => {
                const elementId = element.id || 'No ID'; // Use 'No ID' if the element has no ID
                const elementDataAttributes: { [key: string]: any } = {};

                // Loop through all attributes of the element
                Array.from(element.attributes).forEach((attr) => {
                    if (attr.name.startsWith('data-id-')) {
                        try {
                            // Parse the attribute value as JSON if possible
                            const parsedValue = JSON.parse(attr.value);
                            elementDataAttributes[attr.name] = parsedValue;
                        } catch (error) {
                            // If parsing fails, treat the value as a plain string
                            elementDataAttributes[attr.name] = attr.value;
                        }
                    }
                });

                // Only add the element to the final result if it has data-id-* attributes
                if (Object.keys(elementDataAttributes).length > 0) {
                    dataAttributes[elementId] = {
                        dataAttributes: elementDataAttributes,
                    };
                }
            });

            setJsonOutput(dataAttributes);
            setError(null); // Clear error state
        } catch (e) {
            setError('Failed to parse HTML.');
        }
    };

    const clearTextArea = () => {
        setHtmlInput('');
        setJsonOutput(null); // Clear the extracted JSON when clearing the textarea
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
                Extract
                <span>Data attributes from HTML</span>
            </h2>
            <div className="content">
                <div className="content-decoder">
                    <textarea
                        placeholder="Paste your HTML code here..."
                        value={htmlInput}
                        onChange={handleInputChange}
                        className="textarea"
                    ></textarea>
                    <div className="button-container">
                        <div className="button-actions">
                            <button
                                onClick={extractDataIds}
                                className="decode-button"
                            >
                                Decode
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
    );
}
