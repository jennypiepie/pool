import { useOutfitStore } from "@/src/store/useOutfitStore";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import './index.scss'

const skinList = ['White', 'Brown', 'Black'];

function OutfitPanel() {
  const { onFinish, changeRole,changeSkin,outfit } = useOutfitStore();

  const selectStyle = (color: string) => {
    return {
      border: outfit.skin === color ? '2px solid #85cbf8' : 'none',
    }
  }

  return (
    <div className="outfit">
      <div className="skin_btn">
        {skinList.map((skin, index) => <li onClick={() => changeSkin(skin)} style={selectStyle(skin)} key={index} />)}
      </div>
      <div className="pre_btn" onClick={()=>changeRole('pre')}><LeftOutlined /></div>
      <div className="next_btn" onClick={()=>changeRole('next')}><RightOutlined /></div>
      <div className="finish_btn" onClick={onFinish}>Finish</div>
    </div>
  );
}

export default OutfitPanel;