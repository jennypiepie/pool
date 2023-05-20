import { usePhotoStore } from "@/src/store/usePhotoStore";
import { DownloadOutlined } from "@ant-design/icons";
import { useEffect} from "react";
import ReactDOM from "react-dom";
import './index.scss';


function PhotoList() {
  const { onClose,list } = usePhotoStore();
  // const [photoList, setPhotoList] = useState<any[]>([]);

  const download=(item:any)=> {
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = item.name;
    a.href = item.url;
    a.dispatchEvent(event);
  }

  useEffect(() => { 
    console.log(list);
  },[])

  // useEffect(() => {
  //   const userId = localStorage.getItem('userId');
  //   if (userId) {
  //       getPhotoList({ userId: userId }).then(result => {
  //         const res = result as any;
  //         if (res.errCode === 0) {
  //           setPhotoList(res.data.list);
  //           console.log(res.data.list);
  //         }
  //       });
  //   }
  // }, [photos.shoot]);

  const listRender = list.map((item) =>
    <div className="photo_item" onClick={() => download(item)}>
      <img src={item.url} alt='' ></img>
      <div className="cover">
        <span className="text"><DownloadOutlined />Download</span>
      </div>
    </div>);
  
  return ReactDOM.createPortal(
    <div className="liked_list">
      <div className="container">
        <div className="photo_items">
          {listRender}
        </div>
        <div className="close_btn" onClick={onClose}>X</div>
      </div>
      <div className="mask" />
    </div>,
    document.body
  )
}

export default PhotoList;