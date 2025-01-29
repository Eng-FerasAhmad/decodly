import { useEffect, RefObject } from 'react';

// Extend the Document interface to include webkit-prefixed methods
interface WebkitDocument extends Document {
    webkitExitFullscreen?: () => Promise<void>;
}

// Extend the HTMLDivElement interface to include webkit-prefixed methods
interface FullscreenElement extends HTMLDivElement {
    webkitRequestFullscreen?: () => Promise<void>;
}

// Utility functions for browser compatibility checks
const isWebkitFullscreenSupported = (doc: Document): doc is WebkitDocument =>
    'webkitExitFullscreen' in doc;

const isWebkitFullscreenSupportedForElement = (
    el: HTMLElement
): el is FullscreenElement => 'webkitRequestFullscreen' in el;

// Custom hook to handle fullscreen logic
export function useFullscreen(
    ref: RefObject<HTMLDivElement>,
    isFullscreen: boolean,
    onToggle: (isFullscreen: boolean) => void
) {
    useEffect(() => {
        const handleFullscreenChange = () => {
            const isCurrentlyFullscreen =
                document.fullscreenElement === ref.current;
            onToggle(isCurrentlyFullscreen);
        };

        document.addEventListener('fullscreenchange', handleFullscreenChange);
        document.addEventListener(
            'webkitfullscreenchange',
            handleFullscreenChange
        );

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
    }, [onToggle, ref]);

    useEffect(() => {
        const element = ref.current;

        if (isFullscreen) {
            if (element?.requestFullscreen) {
                void element.requestFullscreen();
            } else if (
                element &&
                isWebkitFullscreenSupportedForElement(element)
            ) {
                void element.webkitRequestFullscreen!();
            }
        } else if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                void document.exitFullscreen();
            } else if (isWebkitFullscreenSupported(document)) {
                void (document as WebkitDocument).webkitExitFullscreen!();
            }
        }
    }, [isFullscreen, ref]);
}
