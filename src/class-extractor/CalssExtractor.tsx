import { useState, ChangeEvent, KeyboardEvent, ReactElement } from 'react';

import JsonOutput from '../JsonOutput';

interface ClassExtractionResult {
    [className: string]: string[]; // Store multiple selectors for the same class
}

export default function ClassExtractor(): ReactElement {
    const [htmlInput, setHtmlInput] = useState<string>('');
    const [jsonOutput, setJsonOutput] = useState<ClassExtractionResult | null>(
        null
    );
    const [classPrefix, setClassPrefix] = useState<string>('id-StoryElement');
    const [excludeClasses, setExcludeClasses] = useState<string>('');
    const [searchLevel, setSearchLevel] = useState<'one-level' | 'all-levels'>(
        'all-levels'
    ); // Toggle state
    const [error, setError] = useState<string | null>(null);
    const [totalCount, setTotalCount] = useState<number>(0);

    const handleInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlInput(e.target.value);
    };

    const handlePrefixChange = (e: ChangeEvent<HTMLInputElement>) => {
        setClassPrefix(e.target.value);
    };

    const handleExcludeChange = (e: ChangeEvent<HTMLInputElement>) => {
        setExcludeClasses(e.target.value);
    };

    const extractClasses = () => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlInput, 'text/html');
            const parentElement = doc.body;

            // Fix: One-Level should check the direct children, not just the root element itself
            const allElements =
                searchLevel === 'one-level'
                    ? Array.from(parentElement.children).flatMap((el) =>
                          Array.from(el.children)
                      ) // Get direct children
                    : parentElement.querySelectorAll('*'); // Get all elements in all levels

            const classData: ClassExtractionResult = {};
            const excludeList = excludeClasses.split(',').map((c) => c.trim());

            allElements.forEach((element) => {
                const classList = Array.from(element.classList);
                const matchingClasses = classList.filter(
                    (className) =>
                        className.startsWith(classPrefix) &&
                        !excludeList.includes(className)
                );

                if (matchingClasses.length > 0) {
                    const selector =
                        element.tagName.toLowerCase() +
                        (element.id ? `#${element.id}` : '') +
                        (classList.length > 0 ? `.${classList.join('.')}` : '');

                    matchingClasses.forEach((className) => {
                        if (!classData[className]) {
                            classData[className] = [];
                        }
                        classData[className].push(selector);
                    });
                }
            });

            const totalItems = Object.keys(classData).reduce(
                (acc, key) => acc + classData[key].length,
                0
            );
            setTotalCount(totalItems);
            setJsonOutput(classData);
            setError(null);
        } catch (e) {
            setError('Failed to parse HTML.');
        }
    };

    const handleSearchLevelChange = () => {
        setSearchLevel((prev) =>
            prev === 'all-levels' ? 'one-level' : 'all-levels'
        );
        extractClasses();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            extractClasses();
        }
    };

    const clearTextArea = () => {
        setHtmlInput('');
        setJsonOutput(null);
        setTotalCount(0);
    };

    return (
        <div className="content-box">
            <h2 className="content-header">
                Extract <span>Class Names from HTML</span>
            </h2>
            <div className="content">
                <div className="content-decoder">
                    <textarea
                        placeholder="Paste your HTML code here..."
                        value={htmlInput}
                        onChange={handleInputChange}
                        className="textarea"
                    ></textarea>

                    <div className="button-container">
                        <div className="buttons-group-left">
                            <button
                                onClick={extractClasses}
                                className="extract-button"
                            >
                                Extract
                            </button>
                            <button
                                onClick={clearTextArea}
                                className="clear-button"
                            >
                                Clear
                            </button>
                        </div>
                        <strong className="count-items">
                            Total Items Found: {totalCount}
                        </strong>
                    </div>
                </div>

                <div className="json-viewer">
                    {error && <p className="error-message">{error}</p>}

                    <JsonOutput
                        jsonOutput={jsonOutput}
                        error={error}
                        collapse={false}
                        collapseLabel={false ? 'Expand' : 'Collapse'}
                        collapseHandler={(): void => console.log('collapse')}
                        copyToClipboard={(): void => console.log('copy')}
                        copyJsonLabel="Copy JSON"
                    />

                    <div>
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                marginTop: 16,
                                gap: 10,
                            }}
                        >
                            <label
                                className="prefix-input-label"
                                htmlFor="prefix-input"
                            >
                                Class Prefix:
                            </label>
                            <input
                                id="prefix-input"
                                type="text"
                                value={classPrefix}
                                onChange={handlePrefixChange}
                                onKeyDown={handleKeyDown}
                                placeholder="Enter class prefix e.g. id-StoryElement"
                                className="attribute-input"
                                style={{ width: '50%', margin: 0 }}
                            />
                            <div className="switch-container">
                                <label>Search Level:</label>
                                <label className="switch">
                                    <input
                                        type="checkbox"
                                        onChange={handleSearchLevelChange}
                                        checked={searchLevel === 'all-levels'}
                                    />
                                    <span className="slider"></span>
                                </label>
                                <span>
                                    {searchLevel === 'all-levels'
                                        ? 'All Levels'
                                        : 'One-Level'}
                                </span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label
                            className="exclude-input-label"
                            htmlFor="exclude-input"
                            style={{ marginRight: 25 }}
                        >
                            Exclude:
                        </label>
                        <input
                            id="exclude-input"
                            type="text"
                            value={excludeClasses}
                            onChange={handleExcludeChange}
                            placeholder="Enter classes to exclude, e.g. id-element, id-anything"
                            className="attribute-input"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
