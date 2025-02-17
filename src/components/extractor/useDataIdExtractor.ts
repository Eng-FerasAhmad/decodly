import { useState } from 'react';

interface DataIdAttributes {
    [key: string]: {
        dataAttributes: { [key: string]: any };
    };
}

export default function useDataIdExtractor() {
    const [jsonOutput, setJsonOutput] = useState<DataIdAttributes | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [attributeName, setAttributeName] = useState<string>('data-id-');

    const extractDataIds = (htmlInput: string) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const allElements = doc.querySelectorAll('*');
            const dataAttributes: DataIdAttributes = {};

            allElements.forEach((element) => {
                const elementId = element.id || 'No ID';
                const elementDataAttributes: { [key: string]: any } = {};

                Array.from(element.attributes).forEach((attr) => {
                    if (attr.name.startsWith(attributeName)) {
                        try {
                            elementDataAttributes[attr.name] = JSON.parse(
                                attr.value
                            );
                        } catch {
                            elementDataAttributes[attr.name] = attr.value;
                        }
                    }
                });

                if (Object.keys(elementDataAttributes).length > 0) {
                    dataAttributes[elementId] = {
                        dataAttributes: elementDataAttributes,
                    };
                }
            });

            setJsonOutput(dataAttributes);
            setError(null);
        } catch {
            setError('Failed to parse HTML.');
        }
    };

    const clearResults = () => {
        setJsonOutput(null);
        setError(null);
    };

    return {
        jsonOutput,
        error,
        attributeName,
        setAttributeName,
        extractDataIds,
        clearResults,
    };
}
