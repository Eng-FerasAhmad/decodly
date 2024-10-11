import { ReactElement, useState } from 'react';

import JsonOutput from './JsonOutput';
import { HistoryGroup, DecodedEntry } from './types';
import HistoryTable from './TableHistory';

interface Props {
    history: HistoryGroup[];
    clearHistory: () => void;
}

export default function History({
    history,
    clearHistory,
}: Props): ReactElement {
    const [selectedJson, setSelectedJson] = useState<DecodedEntry | null>(null);
    const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
    const [copyJsonLabel, setCopyJsonLabel] = useState<string>('Copy JSON');

    const handleRowClick = (item: DecodedEntry) => {
        setSelectedJson(item);
    };

    const clearAndResetJson = () => {
        clearHistory();
        setSelectedJson(null);
    };

    const collapseHandler = () => {
        setIsCollapsed((prev) => !prev);
    };

    const copyToClipboard = () => {
        if (selectedJson) {
            navigator.clipboard.writeText(
                JSON.stringify(selectedJson.json, null, 2)
            );
            setCopyJsonLabel('Copied');
            setTimeout(() => setCopyJsonLabel('Copy JSON'), 2000);
        }
    };

    return (
        <div className="history-container">
            <HistoryTable
                history={history}
                selectedJson={selectedJson}
                handleRowClick={handleRowClick}
                clearAndResetJson={clearAndResetJson}
            />

            <JsonOutput
                jsonOutput={selectedJson && selectedJson.json}
                error={null}
                collapse={isCollapsed ? 0 : 3}
                collapseLabel={isCollapsed ? 'Expand' : 'Collapse'}
                collapseHandler={collapseHandler}
                copyToClipboard={copyToClipboard}
                copyJsonLabel={copyJsonLabel}
            />
        </div>
    );
}
