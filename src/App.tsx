import { ReactElement, useState } from 'react';

import DataIdExtractor from './html-to-json/HtmlToJson';

import Base64Decoder from './Base64Deocder';
import Footer from './Footer';

export default function App(): ReactElement {
    const [activeTab, setActiveTab] = useState<'decoder' | 'extractor'>(
        'decoder'
    );

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
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('decoder')}
                >
                    Decoder
                </button>
                <button
                    style={{
                        cursor: 'pointer',
                        backgroundColor:
                            activeTab === 'extractor' ? '#007bff' : '#f0f0f0',
                        color: activeTab === 'extractor' ? '#fff' : '#000',
                        border: 'none',
                        borderRadius: '5px',
                    }}
                    onClick={() => setActiveTab('extractor')}
                >
                    Extractor
                </button>
            </div>

            {/* Tab Content */}
            <div style={{ flex: '1' }}>
                {activeTab === 'decoder' ? (
                    <Base64Decoder />
                ) : (
                    <DataIdExtractor />
                )}
            </div>

            <Footer />
        </div>
    );
}
