import { ReactElement, useState, KeyboardEvent } from 'react';

import useClassExtractor from 'components/class-extractor/useClassExtractor';
import { useApp } from 'src/context/AppContext';
import FilterControls from 'components/class-extractor/FilterControls';
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

    // Missing states for filters
    const [classPrefix, setClassPrefix] = useState<string>('id-StoryElement');
    const [exactClassName, setExactClassName] = useState<string>('');
    const [oneWordAfterPrefix, setOneWordAfterPrefix] = useState<string>('');

    const handleExtract = () => {
        try {
            const result = extractClasses(
                classInput,
                classPrefix,
                exactClassName,
                oneWordAfterPrefix
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
            handleExtract();
        } else {
            setError('Please enter valid HTML input.');
        }
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <ExtractorLayout
            title="Extract Class Names from HTML"
            clearFunction={clearResults}
            jsonOutput={jsonOutput}
            error={error}
            totalCount={totalCount}
            onEdit={setClassInput}
            inputValue={classInput}
            handleSubmit={handleSubmit}
            hasCount={true}
            placeholder="Paste your HTML code here..."
            filters={
                <FilterControls
                    classPrefix={classPrefix}
                    exactClassName={exactClassName}
                    oneWordAfterPrefix={oneWordAfterPrefix}
                    onClassPrefixChange={(e) => setClassPrefix(e.target.value)}
                    onExactClassNameChange={(e) =>
                        setExactClassName(e.target.value)
                    }
                    onOneWordAfterPrefixChange={(e) =>
                        setOneWordAfterPrefix(e.target.value)
                    }
                    onKeyDown={handleKeyDown}
                />
            }
        />
    );
}
