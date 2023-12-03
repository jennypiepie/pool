import { usePhotoStore } from "@/src/store/usePhotoStore";
import ReactDOM from "react-dom";
import './index.scss';
import WaterFall from "../../components/waterFall";
import { useState } from "react";
import Preview from "@/src/components/preview";
import { deletePhoto } from "@/src/request/api";

function PhotoList() {
  const { closePhotoList, list, delPhoto } = usePhotoStore();
  const [previewImg, setPreviewImg] = useState<HTMLElement>();
  const [preview, setPreiew] = useState(false);

  const openPreview = (e: React.MouseEvent) => {
    const origin = e.target as HTMLElement;
    setPreviewImg(origin);
    setPreiew(true);
  }

  const itemDelete = (item: any) => {
    delPhoto(item);
    deletePhoto({ name: item.name });
  }

  return ReactDOM.createPortal(
    <div className="photo_list">
      {preview && <Preview origin={previewImg} close={() => setPreiew(false)} />}
      <WaterFall title='Album' onClose={closePhotoList} items={list} itemClick={openPreview} itemDelete={itemDelete} />
    </div>
    , document.body)
}

export default PhotoList;