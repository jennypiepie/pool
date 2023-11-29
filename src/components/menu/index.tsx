import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useNavigate } from "react-router-dom";
import './index.scss'

function Menu() {
  const { openLikesList, clearLikesList } = useExhibitsStore();
  const { openPhotoList, clearPhotos } = usePhotoStore();
  const { changeState } = useGlobalStore();
  const { reset } = useOutfitStore();
  const navigate = useNavigate();

  const clearStore = () => {
    changeState(false);
    reset();
    clearPhotos();
    clearLikesList();
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('time');
    setTimeout(() => {
      navigate('/login');
      clearStore();
    }, 500);
  }

  return (
    <div className='menu'>
      <div className="user">{localStorage.getItem('username')}</div>
      <div className='menu_item' onClick={openLikesList}>Likes</div>
      <div className='menu_item' onClick={openPhotoList}>Album</div>
      <div className='menu_item' onClick={logout}>Logout</div>
    </div>
  );
}

export default Menu;
