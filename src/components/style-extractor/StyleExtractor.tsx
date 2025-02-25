import { ReactElement, useState } from 'react';

import ColorList from 'components/style-extractor/ColorList';
import FontList from 'components/style-extractor/FontList';

export default function ExtractStyles(): ReactElement {
    const [backgroundColors, setBackgroundColors] = useState<string[]>([]);
    const [fontColors, setFontColors] = useState<string[]>([]);
    const [fonts, setFonts] = useState<string[]>([]);
    const [htmlContent, setHtmlContent] = useState<string>('');

    // Function to convert RGB/RGBA to HEX
    const rgbToHex = (rgb: string): string => {
        const rgbArray = rgb.match(/\d+/g);
        if (!rgbArray || rgbArray.length < 3) return rgb; // Return original if not RGB format

        const r = parseInt(rgbArray[0], 10);
        const g = parseInt(rgbArray[1], 10);
        const b = parseInt(rgbArray[2], 10);

        return `#${((1 << 24) | (r << 16) | (g << 8) | b)
            .toString(16)
            .slice(1)
            .toUpperCase()}`;
    };

    const extractStyles = (): void => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlContent, 'text/html');
        const elements = Array.from(doc.body.getElementsByTagName('*'));

        const bgColorSet = new Set<string>();
        const fontColorSet = new Set<string>();
        const fontSet = new Set<string>();

        elements.forEach((element) => {
            const computedStyles = window.getComputedStyle(
                element as HTMLElement
            );

            let bgColor = computedStyles.backgroundColor;
            let fontColor = computedStyles.color;

            // Convert colors to HEX if they are in rgb/rgba format
            if (bgColor.startsWith('rgb')) bgColor = rgbToHex(bgColor);
            if (fontColor.startsWith('rgb')) fontColor = rgbToHex(fontColor);

            if ((element as HTMLElement).style.backgroundColor) {
                let inlineBgColor = (element as HTMLElement).style
                    .backgroundColor;
                if (inlineBgColor.startsWith('rgb'))
                    inlineBgColor = rgbToHex(inlineBgColor);
                bgColorSet.add(inlineBgColor);
            }

            bgColorSet.add(bgColor);
            fontColorSet.add(fontColor);
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

    const clearStyles = (): void => {
        setHtmlContent('');
        setBackgroundColors([]);
        setFontColors([]);
        setFonts([]);
    };

    return (
        <div className="p-6 max-w-3xl mx-auto bg-dark">
            <h2 className="text-xl font-bold mb-4 dark:text-white">
                Paste HTML to Extract Styles
            </h2>
            <textarea
                className="w-full h-80 p-3 border bg-[#1E1E1E] text-white rounded-xl focus:outline-none resize-none placeholder-gray-400"
                rows={6}
                value={htmlContent}
                onChange={(e) => setHtmlContent(e.target.value)}
                placeholder="Paste HTML content here..."
                autoFocus={true}
            />
            <div className="flex gap-4 mt-4">
                <button
                    className="px-4 py-2 text-white bg-[#1FBFBF] text-[#121212] font-semibold rounded-lg shadow-md hover:bg-[#17A2A2] transition"
                    onClick={extractStyles}
                >
                    Extract
                </button>
                <button
                    className="px-4 py-2 bg-[#904BBE] text-white font-semibold rounded-lg shadow-md hover:bg-[#7C3EA4] transition"
                    onClick={clearStyles}
                >
                    Clear
                </button>
            </div>

            {backgroundColors.length > 0 && (
                <ColorList
                    colors={backgroundColors}
                    title="Extracted Background Colors"
                />
            )}
            {fontColors.length > 0 && (
                <ColorList colors={fontColors} title="Extracted Font Colors" />
            )}
            {fonts.length > 0 && <FontList fonts={fonts} />}
        </div>
    );
}
