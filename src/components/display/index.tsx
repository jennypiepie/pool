import ReactDOM from "react-dom";
import './index.scss';
import {Image} from 'antd'
import { useExhibitsStore } from "@/src/store/useExhibitsStore";


function Display() {
  const { display,close } = useExhibitsStore();
  const { title, desc, name } = display;


  return ReactDOM.createPortal(
    <div className="display">
      <div className="card">
        <div className="title">{title}</div>
        <div className="content">
          <div className="img_container">
            <Image src={require(`@/assets/textures/paintings/${name}`)}/>
          </div>
          <div className="desc">{desc}</div>
        </div>
        
        <div className="close_btn" onClick={close}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default Display;
