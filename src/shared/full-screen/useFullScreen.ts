import { useEffect, RefObject } from 'react';

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

        return () => {
            document.removeEventListener(
                'fullscreenchange',
                handleFullscreenChange
            );
        };
    }, [onToggle, ref]);

    useEffect(() => {
        const element = ref.current;

        if (isFullscreen) {
            if (element?.requestFullscreen) {
                void element.requestFullscreen();
            }
        } else if (document.fullscreenElement) {
            if (document.exitFullscreen) {
                void document.exitFullscreen();
            }
        }
    }, [isFullscreen, ref]);
}
