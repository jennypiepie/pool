import ReactDOM from 'react-dom';
import './index.scss';

function Mask() {
    return ReactDOM.createPortal(
        <div className="mask" />,
        document.body
    )
}

export default Mask;
