import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useNavigate } from "react-router-dom";
import './index.scss'

function Menu() {
  const { openLikesList, closeLikesList, clearLikesList, likes } = useExhibitsStore();
  const { openPhotoList, closePhotoList, clearPhotos, photos } = usePhotoStore();
  const { turnOnOff } = useGlobalStore();
  const { reset } = useOutfitStore();
  const navigate = useNavigate();

  const clearStore = () => {
    turnOnOff(false);
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

  const openLikes = () => {
    photos.visible && closePhotoList();
    openLikesList();
  }

  const openAlbum = () => {
    likes.visible && closeLikesList();
    openPhotoList();
  }

  return (
    <div className='menu'>
      <div className="user">{localStorage.getItem('username')}</div>
      <div className='menu_item' onClick={openLikes}>Likes</div>
      <div className='menu_item' onClick={openAlbum}>Album</div>
      <div className='menu_item' onClick={logout}>Logout</div>
    </div>
  );
}

export default Menu;
