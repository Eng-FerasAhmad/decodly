import { ReactElement } from 'react';

export default function Footer(): ReactElement {
    return (
        <div className="footer">
            &copy; {new Date().getFullYear()} Feras Ahmad
        </div>
    );
}
