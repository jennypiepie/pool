import { useExhibitsStore } from "@/src/store/useExhibitsStore";
import ReactDOM from "react-dom";
import './index.scss';


function SculpturePanel() {
  const { closeSculpture } = useExhibitsStore();

  
  return ReactDOM.createPortal(
    <div className="sculpture">
      <div className="container">
        <div className="close_btn" onClick={closeSculpture}>X</div>
      </div>
    </div>,
    document.body
  )
}

export default SculpturePanel;
