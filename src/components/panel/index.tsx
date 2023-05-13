import ReactDOM from "react-dom";
import './index.scss';

function Panel() {
  return ReactDOM.createPortal(
		<div className="container">
			<div className="btn_group">
				<div className="btn">sound</div>
				<div className="btn">facelift</div>
				<div className="btn">photo</div>
				<div className="btn">more</div>
			</div>
		</div>,
		document.body
	);
}

export default Panel;
