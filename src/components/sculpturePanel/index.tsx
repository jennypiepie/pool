import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';
import Btn from "../btn";
import { CloseOutlined } from "@ant-design/icons";


function SculpturePanel() {
  const { closeSculpture, sculpture } = useExhibitsStore();


  return ReactDOM.createPortal(
    <div className="sculpture">
      <div className="container">
        <div className="content">
          <div className="title">{sculpture.title}</div>
          <div className="desc">{sculpture.desc}</div>
        </div>
        <Btn onClick={closeSculpture}
          size={40}
          customStyle={{ position: 'absolute', top: 35, right: 135 }}>
          <CloseOutlined />
        </Btn>
      </div>
    </div>,
    document.body
  )
}

export default SculpturePanel;
