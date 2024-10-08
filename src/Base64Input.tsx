import { ReactElement } from 'react';

interface Props {
    base64Input: string;
    setBase64Input: (value: string) => void;
    decodeBase64: () => void;
    clearInput: () => void;
}

export default function Base64Input({
    base64Input,
    setBase64Input,
    decodeBase64,
    clearInput,
}: Props): ReactElement {
    return (
        <div className="content-decoder">
            <textarea
                rows={6}
                cols={30}
                placeholder="Enter Base64 string"
                value={base64Input}
                onChange={(e) => setBase64Input(e.target.value)}
                className="textarea"
            />
            <div className="button-container">
                <button onClick={decodeBase64} className="decode-button">
                    Decode
                </button>
                <button onClick={clearInput} className="clear-button">
                    Clear
                </button>
            </div>
        </div>
    );
}
