import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';
import images from "@/src/assets/images";
import Mask from "../mask";
import WaterFall from "../waterFall";

function LikesList() {
  const { closeLikesList, likes } = useExhibitsStore();

  const urls = likes.list.map((name) => images[name]);

  return ReactDOM.createPortal(
    <div className="liked_list">
      <WaterFall title='Likes' onClose={closeLikesList} urls={urls} />
      <Mask />
    </div>,
    document.body
  )
}

export default LikesList;