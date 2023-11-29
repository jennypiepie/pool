import ReactDOM from "react-dom";
import './index.scss';
import { CloseOutlined } from "@ant-design/icons";
import { useEffect, useRef } from "react";

interface IMessageProps {
    children?: React.ReactNode;
    isVisible?: boolean;
    autohide?: boolean;
    duration?: number;
    setVisible?: (state: boolean) => void;
}
function Message(props: IMessageProps) {
    const { children, isVisible = true, autohide = true, duration = 2, setVisible } = props;
    const messRef = useRef<HTMLDivElement>(null);

    const removeAnimClass = () => {
        messRef.current && messRef.current.classList.remove('down-out');
    }

    const out = () => {
        if (messRef.current && messRef.current.classList.contains('down-in')) {
            messRef.current.classList.remove('down-in');
            messRef.current.classList.add('down-out');
            !!setVisible && setVisible(false);
        }
    }

    useEffect(() => {
        if (isVisible) {
            messRef.current && messRef.current.classList.add('down-in');
            autohide && setTimeout(out, duration * 1000);
        } else {
            out();
        }
    }, [isVisible])

    return ReactDOM.createPortal(
        <div ref={messRef}
            className='message'
            onAnimationEnd={removeAnimClass}
        >
            {children}
            {!!setVisible &&
                <span className="close-btn" onClick={() => setVisible(false)}>
                    <CloseOutlined />

                </span>
            }
        </div>
        , document.body
    )
}

export default Message;