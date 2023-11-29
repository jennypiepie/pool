import { Howl } from 'howler';
import { useEffect, useMemo } from 'react';
import bgmUrl from '@/assets/audio/D254-from-the-deep-sea.mp3';
import { useGlobalStore } from '../../store/useGlobalStore';


const BGM = () => {
    const { bgm } = useGlobalStore();

    const bgmHowl = useMemo(() => new Howl({
        volume: 0.3,
        src: bgmUrl,
        loop: true,
    }), []);

    useEffect(() => {
        bgm ? bgmHowl.play() : bgmHowl.pause();
    }, [bgmHowl, bgm]);


    return null
}

export default BGM;