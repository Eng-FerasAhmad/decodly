import React, { useState } from 'react';

const ExtractStyles = () => {
    const [colors, setColors] = useState([]);
    const [fonts, setFonts] = useState([]);
    const [htmlContent, setHtmlContent] = useState('');

    const extractStyles = () => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const elements = doc.body.getElementsByTagName('*');

        const colorSet = new Set();
        const fontSet = new Set();

        for (const element of elements) {
            const computedStyles = window.getComputedStyle(element);

            // Extract colors from computed styles
            colorSet.add(computedStyles.color);
            colorSet.add(computedStyles.backgroundColor);

            // Extract inline background color if present
            if (element.style.backgroundColor) {
                colorSet.add(element.style.backgroundColor);
            }

            // Extract font family
            fontSet.add(computedStyles.fontFamily);
        }

        setColors(
            [...colorSet].filter(
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
                rows="10"
                cols="50"
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
            />
            <button onClick={extractStyles}>Extract</button>

            <h3>Extracted Colors</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {colors.map((color, index) => (
                    <div
                        key={index}
                        style={{
                            width: '100px',
                            height: '100px',
                            backgroundColor: color,
                            margin: '5px',
                            borderRadius: '5px',
                            border: '1px solid #000',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '10px',
                            color: '#fff',
                            textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                        }}
                    >
                        {color}
                    </div>
                ))}
            </div>

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
