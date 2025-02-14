import { ReactElement } from 'react';

import useClassExtractor from 'components/class-extractor/useClassExtractor';
import { useApp } from 'src/context/AppContext';
import ExtractorLayout from 'components/generator-layout/GeneratorLayout';

export default function ClassExtractor(): ReactElement {
    const { extractClasses, clearResults } = useClassExtractor();
    const {
        jsonOutput,
        error,
        totalCount,
        classInput,
        setError,
        setTotalCount,
        setClassInput,
        setJsonOutput,
    } = useApp();

    const handleExtract = (
        htmlInput: string,
        classPrefix?: string,
        exactClassName?: string,
        oneWordAfterPrefix?: string
    ) => {
        try {
            const result = extractClasses(
                htmlInput,
                classPrefix || '',
                exactClassName || '',
                oneWordAfterPrefix || ''
            );
            setJsonOutput(result);
            setTotalCount(Object.keys(result || {}).length);
            setError(null);
        } catch {
            setError('An error occurred while extracting classes.');
        }
    };

    const handleSubmit = () => {
        if (classInput.trim()) {
            handleExtract(classInput);
        } else {
            setError('Please enter valid HTML input.');
        }
    };

    return (
        <ExtractorLayout
            title="Extract Class Names from HTML"
            events={handleExtract}
            clearFunction={clearResults}
            jsonOutput={jsonOutput}
            error={error}
            totalCount={totalCount}
            showFilters={true}
            onEdit={setClassInput}
            inputValue={classInput}
            handleSubmit={handleSubmit}
        />
    );
}
