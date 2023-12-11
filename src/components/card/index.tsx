import { useLayoutEffect } from 'react';
import Mask from '../mask';
import './index.scss';
import gsap from "gsap";


interface ICardProps {
    children?: React.ReactNode;
    width: number | string;
    height: number | string;
    title: string;
    close: () => void;
}

function Card(props: ICardProps) {
    const { children, width, height, title, close } = props;

    useLayoutEffect(() => {
        gsap.to('.card', {
            opacity: 1,
            duration: 0.4,
            scale: 1,
            ease: 'power1.inOut',
        });
    }, [])

    return (<>
        <div className="card" style={{ width: width, height: height }}>
            <div className="title">{title}</div>
            {children}
            <div className="close_btn" onClick={close}>X</div>
            <Mask />
        </div>
    </>)
}

export default Card;