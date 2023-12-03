import ReactDOM from "react-dom";
import './index.scss';
import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { HeartFilled } from "@ant-design/icons";
import { useState } from "react";
import { updateLikes } from "@/src/request/api";
import images from "@/src/assets/images";
import Card from "../../components/card";
import Preview from "@/src/components/preview";

function Display() {
  const { display, close, setLikes, updateData } = useExhibitsStore();
  const { title, desc, name, beliked, likedNum } = display;
  const [liked, setLiked] = useState(beliked);
  const [lNum, setLNum] = useState(likedNum);
  const [previewImg, setPreviewImg] = useState<HTMLElement>();
  const [preview, setPreiew] = useState(false);

  const finish = async () => {
    close();
    const username = localStorage.getItem('username');
    if (username && name && beliked !== liked) {
      liked ? setLikes(name) : setLikes(name, false);
      await updateLikes({ exhibitsName: name, username });
      updateData();
    }
  }

  const onClick = () => {
    setLiked(!liked);
    liked ? setLNum(lNum - 1) : setLNum(lNum + 1);
  }

  return ReactDOM.createPortal(
    <div className="display">
      <Card width={800} height={380} title={title} close={finish}>
        <div className="content">
          <div className="img_container">
            {preview && <Preview origin={previewImg} close={() => setPreiew(false)} />}
            <img src={images[name]} alt='' onClick={(e) => { setPreiew(true); setPreviewImg(e.target as HTMLElement) }} />
            <div className="liked_btn"
              style={{ color: liked ? '#85cbf8' : '#8d8d8d' }}
              onClick={onClick}
            >
              <HeartFilled />
              <span className="btn_num">{lNum}</span>
            </div>
          </div>
          <div className="desc">{desc}</div>
        </div>
      </Card>
    </div>,
    document.body
  )
}

export default Display;
