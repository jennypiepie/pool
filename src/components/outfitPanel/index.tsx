import { useGlobalStore } from "@/src/store/useGlobalStore";
import './index.scss'

function OutfitPanel() {
  const { onFinish } = useGlobalStore();

  return (
    <div className="outfit">
      <div>
        left
      </div>
      <div>
        right
      </div>
      <div className="finish_btn" onClick={onFinish}>X</div>
    </div>
  );
}

export default OutfitPanel;
