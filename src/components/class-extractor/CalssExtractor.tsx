import { ReactElement } from 'react';

import useClassExtractor from 'components/class-extractor/useClassExtractor';
import ExtractorLayout from 'components/generator-layout/GeneratorLayout';
import { useExtractor } from 'components/generator-layout/useExtractor';

export default function ClassExtractor(): ReactElement {
    const { clearResults } = useClassExtractor();
    const { jsonOutput, error, totalCount, handleExtract } = useExtractor<
        Record<string, string[]>,
        [string, string, string, string]
    >();

    const extractClasses = () => {
        console.log('Extracting classes');
    };

    return (
        <ExtractorLayout
            title="Extract Class Names from HTML"
            events={(
                htmlInput,
                classPrefix,
                exactClassName,
                oneWordAfterPrefix
            ) =>
                handleExtract(
                    extractClasses,
                    htmlInput,
                    classPrefix!,
                    exactClassName!,
                    oneWordAfterPrefix!
                )
            }
            clearFunction={clearResults}
            jsonOutput={jsonOutput}
            error={error}
            totalCount={totalCount}
            showFilters={true}
        />
    );
}
