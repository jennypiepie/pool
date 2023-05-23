import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useNavigate } from "react-router-dom"; 
import './index.scss'

function Menu() {
  const { openLikedList } = useExhibitsStore();
  const { openPhotoList } = usePhotoStore();
  const { changeState } = useGlobalStore();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('time');
    setTimeout(() => {
      navigate('/login');
      changeState(false);
    }, 500);
  }

  return (
    <div className='menu'>
      <div className="user">{localStorage.getItem('username')}</div>
      <div className='menu_item' onClick={openLikedList}>Like</div>
      <div className='menu_item' onClick={openPhotoList}>Photos</div>
      <div className='menu_item' onClick={logout}>Logout</div>
    </div>
  );
}

export default Menu;
