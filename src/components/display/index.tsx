import ReactDOM from "react-dom";
import './index.scss';

interface IDisplayProps{
  painting: string;
}

function Display(props: IDisplayProps) {
  return ReactDOM.createPortal(
    <div className="display">
      <div>
        <img src={require(`@/assets/textures/paintings/${props.painting}`)} alt="" />
      </div>
    </div>,
    document.body
  )
}

export default Display;
