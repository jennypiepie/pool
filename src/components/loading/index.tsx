import ReactDOM from 'react-dom';
import './index.scss';

function Loading({ text }: { text: string }) {
  return ReactDOM.createPortal(
    <div className="loading_container">
      <div className="loading_text">{text}</div>
      <div className='wave1' />
      <div className='wave2' />
      <div className="loading" >
      </div>
    </div>,
    document.body);
}

export default Loading;
