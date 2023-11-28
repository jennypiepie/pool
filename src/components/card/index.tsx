import Mask from '../mask';
import './index.scss';

interface ICardProps {
    children?: React.ReactNode;
    width: number | string;
    height: number | string;
    title: string;
    close: () => void;
}

function Card(props: ICardProps) {
    const { children, width, height, title, close } = props;

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