import { ReactElement } from 'react';

import Base64Decoder from './Base64Deocder';
import Footer from './Footer';

export default function App(): ReactElement {
    return (
        <div>
            <Base64Decoder />
            <Footer />
        </div>
    );
}
