import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { useGlobalStore } from "@/src/store/useGlobalStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import { useNavigate } from "react-router-dom";

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
      changeState(true);
    }, 500);
  }

  return (
    <div className='menu'>
      <div>{localStorage.getItem('username')}</div>
      <div onClick={openLikedList}>liked</div>
      <div onClick={openPhotoList}>photos</div>
      <div onClick={logout}>logout</div>
    </div>
  );
}

export default Menu;
