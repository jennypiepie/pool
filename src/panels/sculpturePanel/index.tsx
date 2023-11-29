import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';
import Btn from "../../components/btn";
import { CameraFilled, CloseOutlined } from "@ant-design/icons";
import { usePhotoStore } from "@/src/store/usePhotoStore";
import CropperModal from "@/src/components/cropper";

function SculpturePanel() {
  const { closeSculpture, sculpture } = useExhibitsStore();
  const { setShoot, setIsCrop, photos } = usePhotoStore();

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
        {photos.isCrop && <CropperModal url={photos.origin} close={() => setIsCrop(false)} />}
      </div>
    </div>,
    document.body
  )
}

export default SculpturePanel;
