import { updateUser } from "@/src/request/api";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import './index.scss'

const skinList = ['White', 'Brown', 'Black'];

function OutfitPanel() {
  const { onFinish, changeRole, changeSkin, outfit } = useOutfitStore();
  const list = localStorage.getItem('outfit')?.split(',')!;
  
  const selectStyle = (color: string) => {
    return {
      border: (outfit.skin || list[1] )=== color ? '2px solid #85cbf8' : 'none',
    }
  }

  const finish = () => {
    onFinish();
    const username = localStorage.getItem('username') || '';
    if (outfit.role && outfit.skin&&(outfit.role!==list[0]||outfit.skin!==list[1])) {
      const outfitStr = `${outfit.role},${outfit.skin}`;
      localStorage.setItem('outfit', outfitStr);
      updateUser({ username, outfit: outfitStr });
    }
  }

  return (
    <div className="outfit">
      <div className="skin_btn">
        {skinList.map((skin, index) => <li onClick={() => changeSkin(skin)} style={selectStyle(skin)} key={index} />)}
      </div>
      <div className="pre_btn" onClick={()=>changeRole('pre')}><LeftOutlined /></div>
      <div className="next_btn" onClick={()=>changeRole('next')}><RightOutlined /></div>
      <div className="finish_btn" onClick={finish}>Finish</div>
    </div>
  );
}

export default OutfitPanel;