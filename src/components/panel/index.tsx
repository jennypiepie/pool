import ReactDOM from "react-dom";
import './index.scss'

function Panel() {
  return ReactDOM.createPortal(
    <div className="container">
      <button className="bgm-control">sound</button>
    </div>,
    document.getElementById('root')!
  )
}

export default Panel;
