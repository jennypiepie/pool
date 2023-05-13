import ReactDOM from "react-dom";
import './index.scss';
import {Image} from 'antd'

interface IDisplayProps{
  painting: string;
  onClose: () => void;
}

function Display(props: IDisplayProps) {
  const {painting,onClose} = props

  return ReactDOM.createPortal(
    <div className="display">
      <div className="card">
        <div className="title">
          TITLE
        </div>
        <div className="content">
          <div className="img_container">
            <Image src={require(`@/assets/textures/paintings/${painting}`)}/>
          {/* <img src={require(`@/assets/textures/paintings/${props.painting}`)} alt="" /> */}
          </div>
          <div className="desc">
            Descsdfghjkvasnsviubuifvewivwefrabohciv
          </div>
        </div>
        
        <div className="close_btn" onClick={onClose}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default Display;
