import { SkinFilled, SoundFilled,CameraFilled,SmileFilled } from "@ant-design/icons";
import ReactDOM from "react-dom";
import './index.scss';
import { Popover,Image } from "antd";
import Menu from "../menu";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";

function Panel() {
	const { onClick } = useOutfitStore();
	const { setShoot, photos } = usePhotoStore();
    const { changeState } = useGlobalStore();

	return ReactDOM.createPortal(
		<div className="container">
			<div className="top_right">
				<Popover placement="leftTop" arrow={false} content={<Menu />}> 
					<div className="btn"><SmileFilled /></div>
				</Popover>
			</div>
			<div className="btn_group">
				<div className="btn" onClick={()=>changeState}><SoundFilled /></div>
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
