import { getExhibitsList } from "@/src/request/api";
import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { FolderOpenFilled } from "@ant-design/icons";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.scss';


function LikedList() {
  const { needUpdate, closeLikedList } = useExhibitsStore();
  const [likedList, setLikedList] = useState<any[]>([]);


  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
        getExhibitsList({ userId: userId }).then(result => {
          const res = result as any;
          if (res.errCode === 0) {
            const resList = (res.data.list as any[]).map(item => item.name);
            setLikedList(resList);
          }
        });
    }
  }, [needUpdate]);

  const listRender = likedList.map((item, index) =>
    <img src={require(`@/assets/textures/paintings/${item}`)} alt='' key={index} />
  );
  
  return ReactDOM.createPortal(
    <div className="liked_list">
      <div className="container">
        <div className="imgs">
          {listRender}
        </div>
        <div className="liked_title">Like</div>
        {likedList.length===0&& <div className="empty"><FolderOpenFilled /></div>}
        <div className="close_btn" onClick={closeLikedList}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default LikedList;