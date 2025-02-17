import { ChangeEvent, KeyboardEvent } from 'react';

interface FilterControlsProps {
    classPrefix: string;
    exactClassName: string;
    oneWordAfterPrefix: string;
    onClassPrefixChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onExactClassNameChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onOneWordAfterPrefixChange: (e: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
}

export default function FilterControls({
    classPrefix,
    exactClassName,
    oneWordAfterPrefix,
    onClassPrefixChange,
    onExactClassNameChange,
    onOneWordAfterPrefixChange,
    onKeyDown,
}: FilterControlsProps) {
    return (
        <div className="bg-dark">
            <div className="space-y-4">
                <div>
                    <label
                        htmlFor="prefix-input"
                        className="block text-sm font-medium text-white"
                    >
                        Class Prefix:
                    </label>
                    <input
                        id="prefix-input"
                        type="text"
                        value={classPrefix}
                        onChange={onClassPrefixChange}
                        onKeyDown={onKeyDown}
                        className="w-full mt-1 px-4 py-2 bg-light border border-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label
                        htmlFor="exact-class-input"
                        className="block text-sm font-medium text-white"
                    >
                        Exact Class Name:
                    </label>
                    <input
                        id="exact-class-input"
                        type="text"
                        value={exactClassName}
                        onChange={onExactClassNameChange}
                        onKeyDown={onKeyDown}
                        className="w-full mt-1 px-4 py-2 bg-light border border-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>

                <div>
                    <label
                        htmlFor="one-word-input"
                        className="block text-sm font-medium text-white"
                    >
                        One Word After Prefix:
                    </label>
                    <input
                        id="one-word-input"
                        type="text"
                        value={oneWordAfterPrefix}
                        onChange={onOneWordAfterPrefixChange}
                        onKeyDown={onKeyDown}
                        className="w-full mt-1 px-4 py-2 bg-light border border-secondary rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
        </div>
    );
}
