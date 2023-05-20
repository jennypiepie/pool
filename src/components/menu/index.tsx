import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import { usePhotoStore } from "@/src/store/usePhotoStore";

function Menu() {
  const { openLikedList } = useExhibitsStore();
  const { openPhotoList } = usePhotoStore();

  return (
    <div className='menu'>
      <div>{localStorage.getItem('username')}</div>
      <div onClick={openLikedList}>liked</div>
      <div onClick={openPhotoList}>photos</div>
    </div>
  );
}

export default Menu;
