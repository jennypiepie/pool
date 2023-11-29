import { SkinFilled, SoundFilled, SmileFilled, QuestionOutlined } from "@ant-design/icons";
import ReactDOM from "react-dom";
import './index.scss';
import { Popover, } from "antd";
import Menu from "../../components/menu";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useState } from "react";
import Btn from "../../components/btn";
import Card from "@/src/components/card";
import BtnGroup from "@/src/components/btn/btnGroup";

function Panel() {
	const { setOutfit } = useOutfitStore();
	const { changeState, bgm } = useGlobalStore();
	const [tipsVisible, setTipsVisible] = useState(false);

	const tipsPanel = () => {
		return (
			<Card title="Tips" width={460} height={260} close={() => setTipsVisible(false)}>
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
			</Card>
		)
	}

	return ReactDOM.createPortal(
		<div className="container">
			{tipsVisible && tipsPanel()}
			<div className="top_right">
				<Popover placement="leftTop" arrow={false} content={<Menu />}>
					<div><Btn><SmileFilled /></Btn></div>
				</Popover>
			</div>
			<BtnGroup position={{ r: 10, b: 10 }}>
				<Btn onClick={() => changeState(!bgm)}><SoundFilled /></Btn>
				<Btn onClick={setOutfit}><SkinFilled /></Btn>
				<Btn onClick={() => setTipsVisible(true)}><QuestionOutlined /></Btn>
			</BtnGroup>
		</div>,
		document.body
	);
}

export default Panel;
