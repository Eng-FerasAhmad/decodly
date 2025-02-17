import JsonOutput from 'shared/json-viewer/JsonOutput';

interface ResultSectionProps {
    jsonOutput: unknown;
    error: string | null;
}

export default function ResultSection({
    jsonOutput,
    error,
}: ResultSectionProps) {
    return (
        <div className="bg-[#1e1e1e]">
            <div className="bg-light">
                <JsonOutput jsonOutput={jsonOutput} error={error} />
            </div>
        </div>
    );
}
