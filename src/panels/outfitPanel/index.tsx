import { updateUser } from "@/src/request/api";
import { useOutfitStore } from "@/src/store/useOutfitStore";
import { CloseOutlined, LeftOutlined, RightOutlined } from "@ant-design/icons";
import './index.scss'
import dice from '@/assets/imgs/dice.png';
import { useState } from "react";
import Btn from "../../components/btn";

function OutfitPanel() {
  const { close, changeRole, changeSkin, outfit, skinList, roleList } = useOutfitStore();
  const [active, setActive] = useState(false);
  const list = localStorage.getItem('outfit')?.split(',')!;

  const selectStyle = (color: string) => {
    return {
      border: (outfit.skin || list[1]) === color ? '2px solid #85cbf8' : 'none',
    }
  }

  const finish = () => {
    close();
    const username = localStorage.getItem('username') || '';
    if (outfit.role && outfit.skin && (outfit.role !== list[0] || outfit.skin !== list[1])) {
      const outfitStr = `${outfit.role},${outfit.skin}`;
      localStorage.setItem('outfit', outfitStr);
      updateUser({ username, outfit: outfitStr });
    }
  }

  const quit = () => {
    close();
    changeSkin(list[1]);
    changeRole(list[0]);
  }

  const chooseRandom = () => {
    setActive(true);
    const skinIndex = Math.floor(Math.random() * skinList.length);
    const roleIndex = Math.floor(Math.random() * roleList.length);
    changeSkin(skinList[skinIndex]);
    changeRole(roleList[roleIndex]);
    setTimeout(() => {
      setActive(false);
    }, 1000);
  }

  return (
    <div className="outfit">
      <div className="skin_btn">
        {skinList.map((skin, index) => <li onClick={() => changeSkin(skin)} style={selectStyle(skin)} key={index} />)}
      </div>
      <div className={`${active ? 'random_btn dice' : 'random_btn'}`} onClick={chooseRandom}>
        <img src={dice} style={{ width: '100%', transform: 'scale(1.2)' }} />
      </div>
      <Btn
        onClick={() => changeRole('pre')}
        size={50}
        YCenter={true}
        customStyle={{ left: 150 }}>
        <LeftOutlined />
      </Btn>
      <Btn
        onClick={() => changeRole('next')}
        size={50}
        YCenter={true}
        customStyle={{ right: 150 }}>
        <RightOutlined />
      </Btn>
      <div className="finish_btn" onClick={finish}>Finish</div>
      <Btn onClick={quit}
        size={40}
        position={{ t: 35, r: 135 }}>
        <CloseOutlined />
      </Btn>
    </div>
  );
}

export default OutfitPanel;