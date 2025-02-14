import { useState, ChangeEvent, KeyboardEvent, ReactElement } from 'react';

import ResultSection from 'components/generator-layout/ResultSection';
import FilterControls from 'components/generator-layout/FilterControls';
import HtmlInputSection from 'components/generator-layout/HTMLInputSection';

interface Props {
    title: string;
    events?: (
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
    onEdit: (text: string) => void;
    inputValue: string;
    handleSubmit: () => void;
}

export default function ExtractorLayout({
    title,
    events,
    clearFunction,
    jsonOutput,
    error,
    totalCount,
    onEdit,
    inputValue,
    handleSubmit,
    showFilters = false,
}: Props): ReactElement {
    const [classPrefix, setClassPrefix] = useState<string>('id-StoryElement');
    const [exactClassName, setExactClassName] = useState<string>('');
    const [oneWordAfterPrefix, setOneWordAfterPrefix] = useState<string>('');

    const handleHtmlInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onEdit(e.target.value);
    };

    const handleClickEvent = () => {
        handleSubmit();
        if (events) {
            events(inputValue, classPrefix, exactClassName, oneWordAfterPrefix);
        }
    };

    const handleClear = () => {
        onEdit('');
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
                            htmlInput={inputValue}
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
