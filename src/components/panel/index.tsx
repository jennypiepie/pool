import { SkinFilled, SoundFilled,CameraFilled,SmileFilled, QuestionOutlined, CheckOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import './index.scss';
import { Popover,Image } from "antd";
import Menu from "../menu";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useState } from "react";

function Panel() {
	const { onClick } = useOutfitStore();
	const { setShoot, photos } = usePhotoStore();
	const { changeState, bgm, photoPopVisible, changePopoverState } = useGlobalStore();
	const [tipsVisible, setTipsVisible] = useState(false);

	const tipsPanel = () => {
		return (
			<div className="tips_container">
				<p className="title">Tips</p>
				<p>
					<span className="action">MOVE:</span>
					<span className="keyboard">W</span>
					<span className="keyboard">S</span>
					<span className="keyboard">A</span>
					<span className="keyboard">D</span>
					
				</p>
				<p>
					<span className="action">RUN:</span>
					<span className="keyboard">E</span>
				</p>
				<button className="tips_btn"
					onClick={()=>setTipsVisible(false)}
				>
					<CheckOutlined />
				</button>
			</div>
		)
	}

	return ReactDOM.createPortal(
		<div className="container">
			{tipsVisible&&tipsPanel()}
			<div className="top_right">
				<Popover placement="leftTop" arrow={false} content={<Menu />}> 
					<div className="btn"><SmileFilled /></div>
				</Popover>
			</div>
			<div className="btn_group">
				<div className="btn" onClick={()=>changeState(!bgm)}><SoundFilled /></div>
				<div className="btn" onClick={onClick}><SkinFilled /></div>
				{photos.current !== '' ?
					<Popover
						placement="left"
						content={<div style={{ width: 100, height: 50 }} onClick={()=>changePopoverState(false)}>
							<Image src={photos.current} />
						</div>}
						open={photoPopVisible}>
						<div className="btn" onClick={()=>setShoot(true)}><CameraFilled /></div>
					</Popover> :
					<div className="btn" onClick={()=>setShoot(true)}><CameraFilled /></div>
				}
				<div className="btn" onClick={()=>setTipsVisible(true)}><QuestionOutlined /></div>
			</div>
		</div>,
		document.body
	);
}

export default Panel;
