import { ReactElement } from 'react';

import ColorBox from 'components/style-extractor/ColorBox';

interface Props {
    colors: string[];
    title: string;
}

export default function ColorList({ colors, title }: Props): ReactElement {
    return (
        <div>
            <h3 className="text-lg font-semibold mt-16 mb-2 dark:text-white">
                {title}
            </h3>
            <div className="flex flex-wrap gap-3">
                {colors
                    .filter((color) => color !== '')
                    .map((color, index) => (
                        <ColorBox key={index} color={color} />
                    ))}
            </div>
        </div>
    );
}
