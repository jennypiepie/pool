import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useNavigate } from "react-router-dom"; 
import './index.scss'

function Menu() {
  const { openLikesList } = useExhibitsStore();
  const { openPhotoList,clear } = usePhotoStore();
  const { changeState,changePopoverState } = useGlobalStore();
  const { reset } = useOutfitStore();
  const navigate = useNavigate();

  const clearStore = () => {
    changeState(false);
    changePopoverState(false)
    reset();
    clear();
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
      <div className='menu_item' onClick={openLikesList}>Like</div>
      <div className='menu_item' onClick={openPhotoList}>Photos</div>
      <div className='menu_item' onClick={logout}>Logout</div>
    </div>
  );
}

export default Menu;
