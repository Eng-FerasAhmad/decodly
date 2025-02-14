import { useState } from 'react';

import { ClassExtractionResult } from 'components/class-extractor/types';

export default function useClassExtractor() {
    const [jsonOutput, setJsonOutput] = useState<ClassExtractionResult | null>(
        null
    );
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const extractClasses = (
        htmlInput: string,
        classPrefix: string,
        exactClassName: string,
        oneWordAfterPrefix: string
    ) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const parentElement = doc.body;
            // Get all elements in all levels
            const allElements = parentElement.querySelectorAll('*');
            const classData: ClassExtractionResult = {};

            allElements.forEach((element) => {
                const classList = Array.from(element.classList);
                let filteredClasses: string[] = [];

                // High Priority: One-Word After Prefix Filter
                if (oneWordAfterPrefix) {
                    filteredClasses = classList.filter((className) => {
                        if (!className.startsWith(oneWordAfterPrefix))
                            return false;
                        const suffix = className.replace(
                            oneWordAfterPrefix,
                            ''
                        );
                        return /^[a-zA-Z0-9]+$/.test(suffix);
                    });
                }
                // Secondary Priority: Exact Class Name Filter
                else if (exactClassName) {
                    if (!classList.includes(exactClassName)) return;
                    filteredClasses = [exactClassName];
                }
                // Default: Class Prefix Filter
                else {
                    filteredClasses = classList.filter((className) =>
                        className.startsWith(classPrefix)
                    );
                }

                if (filteredClasses.length > 0) {
                    const selector =
                        element.tagName.toLowerCase() +
                        (element.id ? `#${element.id}` : '') +
                        (classList.length > 0 ? `.${classList.join('.')}` : '');
                    filteredClasses.forEach((className) => {
                        if (!classData[className]) {
                            classData[className] = [];
                        }
                        classData[className].push(selector);
                    });
                }
            });

            const totalItems = Object.values(classData).reduce(
                (acc, selectors) => acc + selectors.length,
                0
            );
            setTotalCount(totalItems);
            setJsonOutput(classData);
            setError(null);
        } catch (e) {
            setError('Failed to parse HTML.');
        }
    };

    const clearResults = () => {
        setJsonOutput(null);
        setTotalCount(0);
        setError(null);
    };

    return { jsonOutput, error, totalCount, extractClasses, clearResults };
}
