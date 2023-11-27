import ReactDOM from "react-dom";
import './index.scss';
import { Image } from 'antd'
import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { updateLikes } from "@/src/request/api";
import images from "@/src/assets/images";
import Mask from "../mask";

function Display() {
  const { display, close, setLikes } = useExhibitsStore();
  const { title, desc, name, beliked, likedNum } = display;
  const [liked, setLiked] = useState(beliked);
  const [lNum, setLNum] = useState(likedNum)

  const finish = async () => {
    close();
    const username = localStorage.getItem('username');
    if (username && name && beliked !== liked) {
      liked ? setLikes(name) : setLikes(name, false);
      await updateLikes({ exhibitsName: name, username });
    }
  }

  const onClick = () => {
    setLiked(!liked);
    liked ? setLNum(lNum - 1) : setLNum(lNum + 1);
  }

  return ReactDOM.createPortal(
    <div className="display">
      <div className="card">
        <div className="title">{title}</div>
        <div className="content">
          <div className="img_container">
            <Image src={images[name]} />
          </div>
          <div className="desc">{desc}</div>
          <div className="liked_btn"
            style={{ color: liked ? '#85cbf8' : '#8d8d8d' }}
            onClick={onClick}
          >
            <HeartFilled />
            <span className="btn_num">{lNum}</span>
          </div>
        </div>

        <div className="close_btn" onClick={finish}>X</div>
      </div>
      <Mask />
    </div>,
    document.body
  )
}

export default Display;
