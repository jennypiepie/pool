import { SkinFilled, SoundFilled,CameraFilled,SmileFilled } from "@ant-design/icons";
import { Howl } from "howler";
import bgmUrl from '@/assets/audio/D254-from-the-deep-sea.mp3';
import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import './index.scss';

function Panel() {
	const [playing, setPlaying] = useState(true);
	
	const bgmHowl = useMemo(() => new Howl({
        volume: 0.3,
        src: bgmUrl,
        loop: true,
    }), []);

	useEffect(() => {
		playing ? bgmHowl.play() : bgmHowl.pause();
    }, [bgmHowl,playing]);

	return ReactDOM.createPortal(
		<div className="container">
			<div className="top_right">
				<div className="btn"><SmileFilled /></div>
			</div>
			<div className="btn_group">
				<div className="btn" onClick={()=>setPlaying(!playing)}><SoundFilled /></div>
				<div className="btn"><SkinFilled /></div>
				<div className="btn"><CameraFilled /></div>
			</div>
		</div>,
		document.body
	);
}

export default Panel;
