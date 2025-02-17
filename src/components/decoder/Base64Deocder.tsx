import { ReactElement } from 'react';

import ExtractorLayout from 'components/generator-layout/GeneratorLayout';
import useBase64Decoder from 'components/decoder/useBase64Decoder';
import { useApp } from 'src/context/AppContext';

export default function Base64Decoder(): ReactElement {
    const { decodeBase64, clearResults } = useBase64Decoder();
    const { jsonOutput, error, totalCount, base64Input, setBase64Input } =
        useApp();

    const handleSubmit = () => {
        if (base64Input.trim()) {
            decodeBase64();
        } else {
            console.error('No Base64 input provided.');
        }
    };

    return (
        <ExtractorLayout
            title="Decode Base64 code"
            clearFunction={clearResults}
            jsonOutput={jsonOutput}
            error={error}
            totalCount={totalCount}
            onEdit={setBase64Input}
            inputValue={base64Input}
            handleSubmit={handleSubmit}
        />
    );
}
