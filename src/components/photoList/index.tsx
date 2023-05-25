import { usePhotoStore } from "@/src/store/usePhotoStore";
import { DownloadOutlined, FolderOpenFilled } from "@ant-design/icons";
import ReactDOM from "react-dom";
import './index.scss';


function PhotoList() {
  const { onClose,list } = usePhotoStore();

  const download=(item:any)=> {
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = item.name;
    a.href = item.url;
    a.dispatchEvent(event);
  }

  const listRender = list.map((item,index) =>
    <div className="photo_item" onClick={() => download(item)} key={index}>
      <img src={item.url} alt='' ></img>
      <div className="cover">
        <span className="text"><DownloadOutlined />Download</span>
      </div>
    </div>);
  
  return ReactDOM.createPortal(
    <div className="photo_list">
      <div className="container">
        <div className="photo_items">
          {listRender}
        </div>
        <div className="photo_title">Photos</div>
        {list.length===0&& <div className="empty"><FolderOpenFilled /></div>}
        <div className="close_btn" onClick={onClose}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default PhotoList;