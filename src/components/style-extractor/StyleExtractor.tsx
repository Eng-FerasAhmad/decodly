import { useState } from 'react';

const ExtractStyles: React.FC = () => {
    const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
    const [fontColors, setFontColors] = useState<string[]>([]);
    const [fonts, setFonts] = useState<string[]>([]);
    const [htmlContent, setHtmlContent] = useState<string>('');

    const extractStyles = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const elements = Array.from(doc.body.getElementsByTagName('*'));

        const bgColorSet = new Set<string>();
        const fontColorSet = new Set<string>();
        const fontSet = new Set<string>();

        elements.forEach((element) => {
            const computedStyles = window.getComputedStyle(element);

            // Extract background colors
            bgColorSet.add(computedStyles.backgroundColor);

            // Type assertion to access `.style` property
            if ((element as HTMLElement).style.backgroundColor) {
                bgColorSet.add((element as HTMLElement).style.backgroundColor);
            }

            // Extract font colors
            fontColorSet.add(computedStyles.color);

            // Extract font family
            fontSet.add(computedStyles.fontFamily);
        });

        setBackgroundColors(
            [...bgColorSet].filter(
                (color) =>
                    color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)'
            )
        );
        setFontColors(
            [...fontColorSet].filter(
                (color) =>
                    color !== 'transparent' && color !== 'rgba(0, 0, 0, 0)'
            )
        );
        setFonts([...fontSet]);
    };

    return (
        <div>
            <h2>Paste HTML to Extract Styles</h2>
            <textarea
                rows={10}
                cols={50}
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
            />
            <button onClick={extractStyles}>Extract</button>

            {/* Background Colors */}
            <h3>Extracted Background Colors</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {backgroundColors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            width: '80px',
                            height: '80px',
                            backgroundColor: color,
                            borderRadius: '5px',
                            border: '1px solid #000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: '#fff',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                            position: 'relative',
                            cursor: 'pointer',
                        }}
                        title={color} // Show color value on hover
                    >
                        {color}
                    </div>
                ))}
            </div>

            {/* Font Colors */}
            <h3>Extracted Font Colors</h3>
            <ul style={{ display: 'flex', flexWrap: 'wrap', gap: '5px' }}>
                {fontColors.map((color, index) => (
                    <li
                        key={index}
                        style={{
                            color: color,
                            listStyle: 'none',
                            padding: '5px',
                        }}
                    >
                        {color}
                    </li>
                ))}
            </ul>

            {/* Font Families */}
            <h3>Extracted Font Families</h3>
            <ul>
                {fonts.map((font, index) => (
                    <li key={index} style={{ fontFamily: font }}>
                        {font}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExtractStyles;
