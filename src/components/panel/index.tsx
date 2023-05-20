import { SkinFilled, SoundFilled,CameraFilled,SmileFilled } from "@ant-design/icons";
import { Howl } from "howler";
import bgmUrl from '@/assets/audio/D254-from-the-deep-sea.mp3';
import { useEffect, useMemo, useState } from "react";
import ReactDOM from "react-dom";
import './index.scss';
import { Popover,Image } from "antd";
import Menu from "../menu";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";

function Panel() {
	// const { shoot, photoSrc } = props;
	const [playing, setPlaying] = useState(true);
	const [open, setOpen] = useState(false);
	const { onClick } = useOutfitStore();
  	const { setShoot, photos } = usePhotoStore();


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
				<Popover placement="left" content={<Menu />} open={open}> 
					<div className="btn" onClick={()=>setOpen(!open)}><SmileFilled /></div>
				</Popover>
			</div>
			<div className="btn_group">
				<div className="btn" onClick={()=>setPlaying(!playing)}><SoundFilled /></div>
				<div className="btn" onClick={onClick}><SkinFilled /></div>
				{photos.current !== '' ?
					<Popover
						placement="left"
						content={<div style={{ width: 100, height:60}}><Image src={photos.current} /></div>}
						open={true}>
						<div className="btn" onClick={()=>setShoot(true)}><CameraFilled /></div>
					</Popover> :
					<div className="btn" onClick={()=>setShoot(true)}><CameraFilled /></div>
				}
			</div>
		</div>,
		document.body
	);
}

export default Panel;
