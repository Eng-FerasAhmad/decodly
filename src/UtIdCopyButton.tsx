import { ReactElement, useState } from 'react';

interface UtidCopyButtonProps {
    jsonOutput: Record<string, unknown> | null;
}

export default function UtidCopyButton({
    jsonOutput,
}: UtidCopyButtonProps): ReactElement | null {
    const [copyLabel, setCopyLabel] = useState<string>('Copy utid');
    const [isCopied, setIsCopied] = useState<boolean>(false);

    // Recursive function to search for the 'utid' property in the object
    const findUtid = (obj: Record<string, unknown>): string | null => {
        for (const key in obj) {
            if (key === 'utid' && typeof obj[key] === 'string') {
                return obj[key] as string; // Found the utid
            }
            // If the value is an object, recursively search in that object
            if (typeof obj[key] === 'object' && obj[key] !== null) {
                const result = findUtid(obj[key] as Record<string, unknown>);
                if (result) return result; // Return as soon as we find it
            }
        }
        return null; // utid not found
    };

    const utid = jsonOutput ? findUtid(jsonOutput) : null;

    const copyUtidToClipboard = () => {
        if (utid) {
            navigator.clipboard.writeText(utid);
            setCopyLabel('Copied');
            setIsCopied(true);
            setTimeout(() => {
                setCopyLabel('Copy utid');
                setIsCopied(false);
            }, 2000);
        }
    };

    return (
        <button
            disabled={isCopied || !utid}
            className={`copy-utid-button ${!utid ? 'no-utid' : ''}`}
            onClick={copyUtidToClipboard}
        >
            {copyLabel}
        </button>
    );
}
