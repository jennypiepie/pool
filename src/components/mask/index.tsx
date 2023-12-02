import ReactDOM from 'react-dom';
import './index.scss';
import React from 'react';

interface IMaskProps {
    customStyle?: any;
    onClick?: () => void;
}

const Mask = React.forwardRef((props: IMaskProps, ref: React.ForwardedRef<HTMLDivElement>) => {
    const { customStyle, onClick } = props;
    return ReactDOM.createPortal(
        <div className="mask" ref={ref} style={customStyle} onClick={onClick} />,
        document.body
    )
})

export default Mask;
