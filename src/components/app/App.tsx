import { ReactElement } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Footer from 'components/footer/Footer';
import Base64Decoder from 'components/decoder/Base64Deocder';
import DataIdExtractor from 'components/extractor/Extractor';
import JsonViewer from 'components/json-viewer/JsonViewer';
import ClassExtractor from 'components/class-extractor/CalssExtractor';
import ExtractStyles from 'components/style-extractor/StyleExtractor';
import HtmlDomTree from 'components/dom-creator/DomCreator';
import Header from 'components/app/Header';

export default function App(): ReactElement {
    return (
        <Router>
            <Header />
            <div className="pt-16 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col items-center p-6">
                <div className="mt-6 w-full  p-4 bg-white dark:bg-gray-800 shadow-lg rounded-xl">
                    <Routes>
                        <Route path="/" element={<Base64Decoder />} />
                        <Route path="/decoder" element={<Base64Decoder />} />
                        <Route
                            path="/extractor"
                            element={<DataIdExtractor />}
                        />
                        <Route path="/viewer" element={<JsonViewer />} />
                        <Route
                            path="/class-extractor"
                            element={<ClassExtractor />}
                        />
                        <Route
                            path="/style-extractor"
                            element={<ExtractStyles />}
                        />
                        <Route path="/dom-creator" element={<HtmlDomTree />} />
                    </Routes>
                </div>
            </div>
            <Footer />
        </Router>
    );
}
