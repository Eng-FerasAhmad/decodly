import { ReactElement, useState } from 'react';

import DataIdExtractor from './extractor/Extractor';
import JsonViewer from './json-viewer/JsonViewer';
import ClassExtractor from './class-extractor/CalssExtractor';
import ExtractStyles from './style-extractor/StyleExtractor';

import Base64Decoder from './Base64Deocder';
import Footer from './Footer';

export default function App(): ReactElement {
    const [activeTab, setActiveTab] = useState<
        | 'decoder'
        | 'extractor'
        | 'viewer'
        | 'class-extractor'
        | 'style-extractor'
    >('decoder');

    return (
        <div className={'container'}>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '20px',
                }}
            >
                <button
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'decoder' ? '#007bff' : '#f0f0f0',
                        color: activeTab === 'decoder' ? '#fff' : '#000',
                        border: 'none',
                        width: '130px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('decoder')}
                >
                    Decoder
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'extractor' ? '#007bff' : '#f0f0f0',
                        color: activeTab === 'extractor' ? '#f7f7f7' : '#000',
                        border: 'none',
                        width: '130px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('extractor')}
                >
                    Extractor
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        marginRight: '10px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'class-extractor'
                                ? '#007bff'
                                : '#f0f0f0',
                        color:
                            activeTab === 'class-extractor'
                                ? '#f7f7f7'
                                : '#000',
                        border: 'none',
                        width: '140px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('class-extractor')}
                >
                    Class Extractor
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'viewer' ? '#007bff' : '#f0f0f0',
                        color: activeTab === 'viewer' ? '#fff' : '#000',
                        border: 'none',
                        width: '130px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('viewer')}
                >
                    JSON Viewer
                </button>
                <button
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'style-extractor'
                                ? '#007bff'
                                : '#f0f0f0',
                        color:
                            activeTab === 'style-extractor' ? '#fff' : '#000',
                        border: 'none',
                        width: '130px',
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('style-extractor')}
                >
                    Style Extractor
                </button>
            </div>

            {/* Tab Content */}
            <div style={{ flex: '1' }}>
                {activeTab === 'decoder' && <Base64Decoder />}
                {activeTab === 'extractor' && <DataIdExtractor />}
                {activeTab === 'viewer' && <JsonViewer />}
                {activeTab === 'class-extractor' && <ClassExtractor />}
                {activeTab === 'style-extractor' && <ExtractStyles />}
            </div>

            <Footer />
        </div>
    );
}
