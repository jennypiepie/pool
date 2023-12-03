import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';
import images from "@/src/assets/images";
import WaterFall from "../../components/waterFall";
import { updateLikes } from "@/src/request/api";

function LikesList() {
  const { closeLikesList, likes, setLikes, select } = useExhibitsStore();

  const items = likes.list.map((name) => {
    return {
      name,
      url: images[name]
    }
  });

  const itemDelete = (item: any) => {
    const username = localStorage.getItem('username');
    setLikes(item.name, false);
    username && updateLikes({ exhibitsName: item.name, username });
  }

  const openDisplay = (_: React.MouseEvent, item: any) => {
    closeLikesList();
    select(item.name, true);
  }

  return ReactDOM.createPortal(
    <div className="liked_list">
      <WaterFall title='Likes' onClose={closeLikesList} items={items} itemClick={openDisplay} itemDelete={itemDelete} />
    </div>,
    document.body
  )
}

export default LikesList;