import { useRef, useState, useEffect } from 'react';

// Type guards for prefixed methods
function isWebkitFullscreenElementSupported(
    doc: Document
): doc is Document & { webkitExitFullscreen: () => Promise<void> } {
    return 'webkitExitFullscreen' in doc;
}

function isWebkitFullscreenElementSupportedForDiv(
    el: HTMLElement
): el is HTMLElement & { webkitRequestFullscreen: () => Promise<void> } {
    return 'webkitRequestFullscreen' in el;
}

const FullscreenDiv: React.FC = () => {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            if (divRef.current) {
                // Check for standard or prefixed fullscreen methods
                if (divRef.current.requestFullscreen) {
                    divRef.current.requestFullscreen();
                } else if (
                    isWebkitFullscreenElementSupportedForDiv(divRef.current)
                ) {
                    divRef.current.webkitRequestFullscreen(); // Safari
                }
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (isWebkitFullscreenElementSupported(document)) {
                document.webkitExitFullscreen(); // Safari
            }
        }
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(document.fullscreenElement === divRef.current);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener(
            'webkitfullscreenchange',
            handleFullscreenChange
        ); // Safari

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
            document.removeEventListener(
                'webkitfullscreenchange',
                handleFullscreenChange
            );
        };
    }, []);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (isWebkitFullscreenElementSupported(document)) {
                    document.webkitExitFullscreen();
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return (
        <div>
            <button onClick={toggleFullscreen}>
                {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
            </button>
            <div
                ref={divRef}
                style={{
                    width: '100%',
                    height: '300px',
                    backgroundColor: 'lightblue',
                    marginTop: '10px',
                }}
            >
                <button onClick={toggleFullscreen}>
                    {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
                </button>
                Click the button to toggle fullscreen!
            </div>
        </div>
    );
};

export default FullscreenDiv;
