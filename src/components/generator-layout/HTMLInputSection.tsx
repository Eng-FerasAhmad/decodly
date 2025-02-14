import { ChangeEvent } from 'react';

interface HtmlInputSectionProps {
    htmlInput: string;
    onHtmlInputChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    onEventClick: () => void;
    onClear: () => void;
    totalCount: number;
}

export default function HtmlInputSection({
    htmlInput,
    onHtmlInputChange,
    onEventClick,
    onClear,
    totalCount,
}: HtmlInputSectionProps) {
    return (
        <div className="bg-dark p-6 rounded-2xl shadow-lg border border-secondary">
            <textarea
                className="w-full h-40 p-3 border  bg-[#1E1E1E] text-white rounded-lg focus:outline-none resize-none placeholder-gray-400"
                placeholder="Paste your HTML code here..."
                value={htmlInput}
                onChange={onHtmlInputChange}
            />
            <div className="flex justify-between items-center mt-4">
                <div className="flex space-x-3">
                    <button
                        onClick={onEventClick}
                        className="px-4 py-2 bg-[#1FBFBF] text-[#121212] font-semibold rounded-lg shadow-md hover:bg-[#17A2A2] transition"
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
                <strong className="text-[#6E6DDF]">
                    Total Items Found: {totalCount}
                </strong>
            </div>
        </div>
    );
}
