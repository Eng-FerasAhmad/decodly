import { ReactElement } from 'react';

import Base64Decoder from './Base64Deocder';

export default function App(): ReactElement {
    return (
        <div>
            <Base64Decoder />
            <div className="footer">
                &copy; {new Date().getFullYear()} Feras Ahmad
            </div>
        </div>
    );
}
