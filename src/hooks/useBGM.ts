import { Howl } from 'howler';
import { useEffect, useMemo } from 'react';
import bgmUrl from '@/assets/audio/D254-from-the-deep-sea.mp3';

export const useBGM = () => {
    const bgmHowl = useMemo(() => new Howl({
        volume: 0.3,
        src: bgmUrl,
        loop: true,
    }), []);

    useEffect(() => {
        bgmHowl.play();

        return () => {
            bgmHowl.stop();
        }
    }, [bgmHowl]);

}