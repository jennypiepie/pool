import { useExhibitsStore } from "@/src/store/useExhibitsStore";

function Menu() {
  const {openLikedList } = useExhibitsStore();

  return (
    <div className='menu'>
      <div>{localStorage.getItem('username')}</div>
      <div onClick={openLikedList}>liked</div>
      <div>photos</div>
    </div>
  );
}

export default Menu;
