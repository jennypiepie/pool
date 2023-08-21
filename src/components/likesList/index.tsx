import { getExhibits } from "@/src/request/api";
import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { FolderOpenFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.scss';


function LikesList() {
  const { needUpdate, closeLikesList } = useExhibitsStore();
  const [likesList, setLikesList] = useState<any[]>([]);

  useEffect(() => {
    const username = localStorage.getItem('username');
    if (username) {
        getExhibits({ username: username }).then(result => {
          const data = result.data;
          if (data.length) {
            const resList = (data as any[]).map(item => item.name);
            setLikesList(resList);
          }
        });
    }
  }, [needUpdate]);

  const listRender = likesList.map((item, index) =>
    <img src={require(`@/assets/textures/paintings/${item}`)} alt='' key={index} />
  );
  
  return ReactDOM.createPortal(
    <div className="liked_list">
      <div className="container">
        <div className="imgs">
          {listRender}
        </div>
        <div className="liked_title">Likes</div>
        {likesList.length===0&& <div className="empty"><FolderOpenFilled /></div>}
        <div className="close_btn" onClick={closeLikesList}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default LikesList;