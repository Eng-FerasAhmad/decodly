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
    ): ClassExtractionResult => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const allElements = doc.body.querySelectorAll('*');
            const classData: ClassExtractionResult = {};

            allElements.forEach((element) => {
                const classList = Array.from(element.classList);
                let filteredClasses: string[] = [];

                if (oneWordAfterPrefix) {
                    filteredClasses = classList.filter((className) =>
                        className.startsWith(oneWordAfterPrefix)
                    );
                } else if (exactClassName) {
                    if (classList.includes(exactClassName)) {
                        filteredClasses = [exactClassName];
                    }
                } else {
                    filteredClasses = classList.filter((className) =>
                        className.startsWith(classPrefix)
                    );
                }

                if (filteredClasses.length > 0) {
                    filteredClasses.forEach((className) => {
                        if (!classData[className]) {
                            classData[className] = [];
                        }
                        classData[className].push(
                            element.tagName.toLowerCase()
                        );
                    });
                }
            });

            setTotalCount(Object.keys(classData).length);
            setJsonOutput(classData);
            setError(null);
            return classData;
        } catch (e) {
            setError('Failed to parse HTML.');
            return {};
        }
    };

    const clearResults = () => {
        setJsonOutput(null);
        setTotalCount(0);
        setError(null);
    };

    return { jsonOutput, error, totalCount, extractClasses, clearResults };
}
