import { ReactElement, useState, KeyboardEvent } from 'react';

import ExtractorLayout from 'components/generator-layout/GeneratorLayout';
import DataIdFilterControls from 'components/extractor/DataIdFilterControlles';
import useDataIdExtractor from 'components/extractor/useDataIdExtractor';

export default function DataIdExtractor(): ReactElement {
    const {
        jsonOutput,
        error,
        attributeName,
        setAttributeName,
        extractDataIds,
        clearResults,
    } = useDataIdExtractor();
    const [htmlInput, setHtmlInput] = useState<string>('');

    const handleSubmit = () => {
        if (htmlInput.trim()) {
            extractDataIds(htmlInput);
        } else {
            setAttributeName('Please enter valid HTML input.');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <ExtractorLayout
            title="Extract Data Attributes from HTML"
            clearFunction={clearResults}
            jsonOutput={jsonOutput}
            error={error}
            totalCount={jsonOutput ? Object.keys(jsonOutput).length : 0}
            onEdit={setHtmlInput}
            inputValue={htmlInput}
            handleSubmit={handleSubmit}
            filters={
                <DataIdFilterControls
                    attributeName={attributeName}
                    onAttributeNameChange={(e) =>
                        setAttributeName(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                />
            }
        />
    );
}
