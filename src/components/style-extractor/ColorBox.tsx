import { ReactElement, useState } from 'react';

interface Props {
    color: string;
}

export default function ColorBox({ color }: Props): ReactElement {
    const [copied, setCopied] = useState<boolean>(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(color);
        setCopied(true);

        // Reset "Copied!" text after 1.5s
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div
            className="w-40 h-20 rounded-lg border border-gray-800 flex items-center justify-center text-xs text-white shadow-md cursor-pointer"
            style={{ backgroundColor: color }}
            title={color}
            onClick={handleCopy}
        >
            {copied ? 'Copied!' : color}
        </div>
    );
}
