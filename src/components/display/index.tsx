import ReactDOM from "react-dom";
import './index.scss';

interface IDisplayProps{
  painting: string;
}

function Display(props: IDisplayProps) {
  return ReactDOM.createPortal(
    <div className="display">
      <img src={require(`@/assets/textures/paintings/${props.painting}`)} alt="" />
    </div>,
    document.body
  )
}

export default Display;
