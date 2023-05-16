import ReactDOM from "react-dom";
import './index.scss';
import {Image} from 'antd'
import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { collectExhibits } from "@/src/request/api";


function Display() {
  const { display,close } = useExhibitsStore();
  const { title, desc, name, exhibitsId,beliked } = display;
  const [liked, setLiked] = useState(beliked);

  const finish = () => {
    const userId = Number(localStorage.getItem('userId'));
    if (userId > 0 && exhibitsId > 0) {
      collectExhibits({userId, exhibitsId ,liked});
    }
    close();
  } 

  return ReactDOM.createPortal(
    <div className="display">
      <div className="card">
        <div className="title">{title}</div>
        <div className="content">
          <div className="img_container">
            <Image src={require(`@/assets/textures/paintings/${name}`)}/>
          </div>
          <div className="desc">{desc}</div>
          <div className="liked_btn"
            style={{ color: liked ? '#85cbf8' : '#8d8d8d' }}
            onClick={()=>setLiked(!liked)}
          >
            <HeartFilled />
          </div>
        </div>
        
        <div className="close_btn" onClick={finish}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default Display;
