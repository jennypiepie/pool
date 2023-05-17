import { getExhibitsList } from "@/src/request/api";
import { useUserStore } from "@/src/store/useUserStore";

function Menu() {
  const { user,setList } = useUserStore();

  const openLikedListPanel = async () => {

    const res = await getExhibitsList({idList: user.liked}) as any;
    if (res.errCode === 0) {
      const list: any[] = res.data.list;
      const nameList = list.map(l => l.name);
      setList(nameList);
      
    }
  }

  return (
    <div className='menu'>
      <div>{user.username}</div>
      <div onClick={openLikedListPanel}>liked</div>
      <div>photos</div>
    </div>
  );
}

export default Menu;
