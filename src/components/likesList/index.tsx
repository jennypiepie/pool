import { getExhibits } from "@/src/request/api";
import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import './index.scss';
import images from "@/src/assets/images";
import Mask from "../mask";
import WaterFall from "../waterFall";

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

  const urls = likesList.map((name) => images[name]);

  return ReactDOM.createPortal(
    <div className="liked_list">
      <WaterFall title='Likes' onClose={closeLikesList} urls={urls} />
      <Mask />
    </div>,
    document.body
  )
}

export default LikesList;