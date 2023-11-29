import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';
import Btn from "../../components/btn";
import { CameraFilled, CloseOutlined } from "@ant-design/icons";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import CropperModal from "@/src/components/cropper";
import Message from "@/src/components/message";
import { useState } from "react";

function SculpturePanel() {
  const { closeSculpture, sculpture } = useExhibitsStore();
  const { setShoot, setIsCrop, openPhotoList, photos } = usePhotoStore();
  const [mesVisible, setMesVisible] = useState(false);

  const finish = () => {
    setIsCrop(false);
    setMesVisible(true);
  }

  const open = () => {
    setMesVisible(false);
    openPhotoList();
  }

  return ReactDOM.createPortal(
    <div className="sculpture">
      <div className="container">
        <div className="content">
          <div className="title">{sculpture.title}</div>
          <div className="desc">{sculpture.desc}</div>
        </div>
        <Btn onClick={closeSculpture}
          size={40}
          position={{ t: 35, r: 135 }}
        >
          <CloseOutlined />
        </Btn>
        <Btn onClick={() => setShoot(true)} position={{ b: 40, r: 40 }}>
          <CameraFilled />
        </Btn>
        {photos.isCrop && <CropperModal
          url={photos.origin}
          close={() => setIsCrop(false)}
          finish={finish} />}
        <Message
          isVisible={mesVisible}
          setVisible={(state: boolean) => setMesVisible(state)}
          duration={5}
        >
          Save Successfully!&nbsp;
          <a onClick={open}>Open the Album</a>
        </Message>
      </div>
    </div>,
    document.body
  )
}

export default SculpturePanel;
