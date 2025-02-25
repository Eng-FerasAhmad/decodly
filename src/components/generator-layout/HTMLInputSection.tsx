import { ChangeEvent } from 'react';

interface HtmlInputSectionProps {
    htmlInput: string;
    onHtmlInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onEventClick: () => void;
    onClear: () => void;
    totalCount: number;
    hasCount?: boolean;
    placeholder?: string;
}

export default function HtmlInputSection({
    htmlInput,
    onHtmlInputChange,
    onEventClick,
    onClear,
    totalCount,
    hasCount,
    placeholder,
}: HtmlInputSectionProps) {
    return (
        <div className="bg-dark" data-testid="html-input-section">
            <textarea
                className="w-full h-80 p-3 border  bg-[#1E1E1E] text-white rounded-xl focus:outline-none resize-none placeholder-gray-400"
                placeholder={placeholder}
                value={htmlInput}
                onChange={onHtmlInputChange}
                autoFocus={true}
            />
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-3">
                    <button
                        onClick={onEventClick}
                        className="px-4 py-2 text-white  bg-[#1FBFBF] text-[#121212] font-semibold rounded-lg shadow-md hover:bg-[#17A2A2] transition"
                    >
                        Extract
                    </button>
                    <button
                        onClick={onClear}
                        className="px-4 py-2 bg-[#904BBE] text-white font-semibold rounded-lg shadow-md hover:bg-[#7C3EA4] transition"
                    >
                        Clear
                    </button>
                </div>
                {hasCount && (
                    <strong className="text-[#6E6DDF]">
                        Total Items Found: {totalCount}
                    </strong>
                )}
            </div>
        </div>
    );
}
