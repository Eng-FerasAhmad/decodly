import { ChangeEvent, KeyboardEvent } from 'react';

interface DataIdFilterControlsProps {
    attributeName: string;
    onAttributeNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function DataIdFilterControls({
    attributeName,
    onAttributeNameChange,
    onKeyDown,
}: DataIdFilterControlsProps) {
    return (
        <div className="bg-dark p-6 rounded-2xl shadow-lg border border-secondary">
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="attribute-input"
                        className="block text-sm font-medium text-white"
                    >
                        Data Attribute:
                    </label>
                    <input
                        id="attribute-input"
                        type="text"
                        value={attributeName}
                        onChange={onAttributeNameChange}
                        onKeyDown={onKeyDown}
                        className="w-full mt-1 px-4 py-2 bg-light border border-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
        </div>
    );
}
