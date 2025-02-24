import { ChangeEvent, ReactElement, ReactNode } from 'react';

import ResultSection from 'components/generator-layout/ResultSection';
import HtmlInputSection from 'components/generator-layout/HTMLInputSection';

interface Props {
    title: string;
    clearFunction: () => void;
    jsonOutput: unknown;
    error: string | null;
    totalCount: number;
    filters?: ReactNode;
    onEdit: (text: string) => void;
    inputValue: string;
    handleSubmit: () => void;
    hasCount?: boolean;
    placeholder?: string;
}

export default function ExtractorLayout({
    title,
    clearFunction,
    jsonOutput,
    error,
    totalCount,
    onEdit,
    inputValue,
    handleSubmit,
    filters,
    hasCount,
    placeholder,
}: Props): ReactElement {
    const handleHtmlInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        onEdit(e.target.value);
    };

    const handleClickEvent = () => {
        handleSubmit();
    };

    const handleClear = () => {
        onEdit('');
        clearFunction();
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
                            hasCount={hasCount}
                            placeholder={placeholder}
                        />
                        {filters}
                    </div>
                </div>

                <div className="w-full lg:w-1/2">
                    <ResultSection jsonOutput={jsonOutput} error={error} />
                </div>
            </div>
        </div>
    );
}
