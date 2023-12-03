import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';
import images from "@/src/assets/images";
import WaterFall from "../../components/waterFall";

function LikesList() {
  const { closeLikesList, likes } = useExhibitsStore();

  const items = likes.list.map((name) => {
    return {
      name,
      url: images[name]
    }
  });

  return ReactDOM.createPortal(
    <div className="liked_list">
      <WaterFall title='Likes' onClose={closeLikesList} items={items} />
    </div>,
    document.body
  )
}

export default LikesList;