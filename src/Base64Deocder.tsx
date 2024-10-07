import { useState } from 'react';
import ReactJson from 'react-json-view';

function Base64Decoder() {
    const [base64Input, setBase64Input] = useState('');
    const [jsonOutput, setJsonOutput] = useState(null);
    const [error, setError] = useState<string | null>(null);
    const [collapse, setCollapse] = useState<number | boolean>(3);
    const [collapseLabel, setCollapseLabel] = useState<string>('Expand');
    const [copyJsonLabel, setCopyJsonLabel] = useState<string>('Copy JSON');

    const decodeBase64 = () => {
        try {
            if (!base64Input) throw new Error('Empty input');

            const decodedString = atob(base64Input);
            const utf8String = decodeURIComponent(
                decodedString.split('').map((char) => {
                    return '%' + ('00' + char.charCodeAt(0).toString(16)).slice(-2);
                }).join('')
            );

            const json = JSON.parse(utf8String);
            // Check if json is a valid object before setting it
            if (typeof json === 'object' && json !== null) {
                setJsonOutput(json);
                setError(null);
            } else {
                throw new Error('Decoded value is not a valid JSON object');
            }
        } catch (err) {
            setError('Invalid Base64 or JSON format');
            setJsonOutput(null);
        }
    };

    const copyToClipboard = () => {
        if (jsonOutput) {
            navigator.clipboard.writeText(JSON.stringify(jsonOutput, null, 2));
            setCopyJsonLabel('Copied')
        }
    };

    const clearInput = () => {
        setBase64Input('');
        setJsonOutput(null);
        setError(null);
    };

    const collapseHandler = (): void => {
        if (collapse === 3 ) {
            setCollapseLabel('Collapse');
            setCollapse(false);
        }

        if (collapse === false ) {
            setCollapseLabel('Expand');
            setCollapse(3);
        }
    }

    return (
        <div className="container">
            <div className="content-box">
                <h2>Base64 to JSON Decoder</h2>
                <div className="flex-container">
                    <div className="content-decoder">
                      <textarea
                          rows={6}
                          cols={30}
                          placeholder="Enter Base64 string"
                          value={base64Input}
                          onChange={(e) => setBase64Input(e.target.value)}
                          className="textarea"
                      />
                    {/*decoder button*/}
                    <div className="button-container">
                        <button onClick={decodeBase64} className="decode-button">
                            Decode
                        </button>
                        <button onClick={clearInput} className="clear-button">
                            Clear
                        </button>
                    </div>
                    </div>
                    <div className="json-output-container">
                        <button onClick={copyToClipboard} className="copy-button">
                            {copyJsonLabel}
                        </button>
                        <button onClick={collapseHandler} className="collapse-button">
                            {collapseLabel}
                        </button>
                        {error && <p className="error-message">{error}</p>}
                        {jsonOutput && (
                            <div className="json-output">
                                <h3>Decoded JSON:</h3>
                                <ReactJson name={null} src={jsonOutput} theme="monokai" collapsed={collapse } />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Base64Decoder;
