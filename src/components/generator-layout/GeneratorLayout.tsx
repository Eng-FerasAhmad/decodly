import { useState, ChangeEvent, KeyboardEvent, ReactElement } from 'react';

import HtmlInputSection from 'components/generator-layout/HTMLInputSection';
import ResultSection from 'components/generator-layout/ResultSection';
import FilterControls from 'components/generator-layout/FilterControls';

interface Props {
    title: string;
    events: (
        htmlInput: string,
        classPrefix?: string,
        exactClassName?: string,
        oneWordAfterPrefix?: string
    ) => void;
    clearFunction: () => void;
    jsonOutput: unknown;
    error: string | null;
    totalCount: number;
    showFilters?: boolean;
}

export default function ExtractorLayout({
    title,
    events,
    clearFunction,
    jsonOutput,
    error,
    totalCount,
    showFilters = false,
}: Props): ReactElement {
    const [htmlInput, setHtmlInput] = useState<string>('');
    const [classPrefix, setClassPrefix] = useState<string>('id-StoryElement');
    const [exactClassName, setExactClassName] = useState<string>('');
    const [oneWordAfterPrefix, setOneWordAfterPrefix] = useState<string>('');

    const handleHtmlInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setHtmlInput(e.target.value);
    };

    const handleClickEvent = () => {
        events(htmlInput, classPrefix, exactClassName, oneWordAfterPrefix);
    };

    const handleClear = () => {
        setHtmlInput('');
        clearFunction();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleClickEvent();
        }
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-white text-center mb-6">
                {title}
            </h2>

            <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2">
                    <div className="flex flex-col gap-6">
                        <HtmlInputSection
                            htmlInput={htmlInput}
                            onHtmlInputChange={handleHtmlInputChange}
                            onEventClick={handleClickEvent}
                            onClear={handleClear}
                            totalCount={totalCount}
                        />
                        {showFilters && (
                            <FilterControls
                                classPrefix={classPrefix}
                                exactClassName={exactClassName}
                                oneWordAfterPrefix={oneWordAfterPrefix}
                                onClassPrefixChange={(e) =>
                                    setClassPrefix(e.target.value)
                                }
                                onExactClassNameChange={(e) =>
                                    setExactClassName(e.target.value)
                                }
                                onOneWordAfterPrefixChange={(e) =>
                                    setOneWordAfterPrefix(e.target.value)
                                }
                                onKeyDown={handleKeyDown}
                            />
                        )}
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <ResultSection jsonOutput={jsonOutput} error={error} />
                </div>
            </div>
        </div>
    );
}
