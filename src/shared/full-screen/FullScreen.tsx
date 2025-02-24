import { useRef, ReactElement, PropsWithChildren } from 'react';

import { useFullscreen } from './useFullScreen';

interface Props {
    isFullscreen: boolean;
    onToggle: (isFullscreen: boolean) => void;
    lockFullscreen?: boolean; // If true, prevent exiting fullscreen
}

export function ReactFullScreen({
    isFullscreen,
    onToggle,
    lockFullscreen = false,
    children,
}: PropsWithChildren<Props>): ReactElement {
    const divRef = useRef<HTMLDivElement | null>(null);

    useFullscreen(divRef, isFullscreen, (fullscreenState) => {
        if (!lockFullscreen) {
            onToggle(fullscreenState);
        }
    });

    return <div ref={divRef}>{children}</div>;
}
