import { Fragment, ReactElement } from 'react';

import { HistoryGroup, DecodedEntry } from '../../types/types';

interface Props {
    history: HistoryGroup[];
    selectedJson: DecodedEntry | null;
    handleRowClick: (item: DecodedEntry) => void;
    clearAndResetJson: () => void;
}

export default function HistoryTable({
    history,
    selectedJson,
    handleRowClick,
    clearAndResetJson,
}: Props): ReactElement {
    return (
        <div className="history-table content-decoder">
            <div className="history-table-header">
                <h3>Decoded History</h3>
                <button className="clear-history" onClick={clearAndResetJson}>
                    Clear History
                </button>
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Decoded JSON</th>
                    </tr>
                </thead>
                <tbody>
                    {history.length > 0 ? (
                        history.map((group, index) => (
                            <Fragment key={index}>
                                <tr>
                                    <td
                                        colSpan={2}
                                        style={{
                                            background: '#f0f0f0',
                                            textAlign: 'left',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        {group.date}
                                    </td>
                                </tr>
                                {group.items.map((item, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => handleRowClick(item)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'background 0.2s',
                                            background:
                                                selectedJson === item
                                                    ? '#ccf2ff'
                                                    : 'transparent',
                                        }}
                                    >
                                        <td>
                                            {new Date(
                                                item.date
                                            ).toLocaleString()}
                                        </td>
                                        <td>
                                            {JSON.stringify(
                                                item.json,
                                                null,
                                                2
                                            ).slice(0, 30)}
                                            ...
                                        </td>
                                    </tr>
                                ))}
                            </Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={2}>No history available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
