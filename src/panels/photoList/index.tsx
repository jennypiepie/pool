import { usePhotoStore } from "@/src/store/usePhotoStore";
// import { DownloadOutlined, FolderOpenFilled } from "@ant-design/icons";
import ReactDOM from "react-dom";
import './index.scss';
import WaterFall from "../../components/waterFall";

function PhotoList() {
  const { onClose, list } = usePhotoStore();

  // const download=(item:any)=> {
  //   const a = document.createElement('a')
  //   const event = new MouseEvent('click')
  //   a.download = item.name;
  //   a.href = item.url;
  //   a.dispatchEvent(event);
  // }

  return ReactDOM.createPortal(
    <div className="photo_list">
      <WaterFall title='Album' onClose={onClose} urls={list} />
    </div>
    , document.body)
}

export default PhotoList;