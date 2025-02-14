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
        <div className="bg-dark">
            <div className="bg-light">
                <JsonOutput
                    jsonOutput={jsonOutput}
                    error={error}
                    collapse={false}
                    collapseLabel="Collapse"
                    collapseHandler={() => console.log('collapse')}
                    copyToClipboard={() => console.log('copy')}
                    copyJsonLabel="Copy JSON"
                />
            </div>
        </div>
    );
}
