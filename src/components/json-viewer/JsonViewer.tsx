import { ReactElement, useState } from 'react';

import useJsonFormatter from 'components/json-viewer/useJsonFormatter';
import ExtractorLayout from 'components/generator-layout/GeneratorLayout';

export default function JsonViewer(): ReactElement {
    const { jsonOutput, error, formatJson, clearResults } = useJsonFormatter();
    const [jsonInput, setJsonInput] = useState<string>('');

    const handleSubmit = () => {
        formatJson(jsonInput);
    };

    return (
        <ExtractorLayout
            title="JSON Viewer"
            clearFunction={clearResults}
            jsonOutput={jsonOutput}
            error={error}
            totalCount={jsonOutput ? Object.keys(jsonOutput).length : 0}
            onEdit={setJsonInput}
            inputValue={jsonInput}
            handleSubmit={handleSubmit}
            filters={null}
            placeholder="Paste your JSON here"
        />
    );
}
