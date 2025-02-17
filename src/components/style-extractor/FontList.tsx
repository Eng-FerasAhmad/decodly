import { ReactElement } from 'react';

interface Props {
    fonts: string[];
}

export default function FontList({ fonts }: Props): ReactElement {
    return (
        <div>
            <h3 className="text-lg font-semibold mb-2 dark:text-white">
                Extracted Font Families
            </h3>
            <ul>
                {fonts.map((font, index) => (
                    <li
                        key={index}
                        className="text-gray-800 dark:text-white"
                        style={{ fontFamily: font }}
                    >
                        {font}
                    </li>
                ))}
            </ul>
        </div>
    );
}
