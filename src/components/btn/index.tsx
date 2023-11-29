import './index.scss';

interface IBtnProps {
    onClick?: () => void;
    children?: React.ReactNode;
    size?: number;
    color?: string;
    customStyle?: any
    YCenter?: boolean;
    position?: {
        l?: number,
        r?: number,
        t?: number,
        b?: number
    };
}

function Btn(props: IBtnProps) {
    const { onClick, children, size = 46, color = 'white', customStyle, YCenter = false, position } = props;
    const btnStyle: React.CSSProperties = {
        width: size,
        height: size,
        borderRadius: size / 2,
        border: `2px solid ${color}`,
        color: color,
        ...customStyle,
    };

    position && Object.assign(btnStyle, {
        position: 'absolute',
        left: position.l ? position.l : 'unset',
        right: position.r ? position.r : 'unset',
        top: position.t ? position.t : 'unset',
        bottom: position.b ? position.b : 'unset',
    });

    YCenter && Object.assign(btnStyle, {
        position: 'absolute',
        top: "50%",
        transform: ["translateY(-50%)"],
    });

    return (<>
        <div className="btn"
            onClick={onClick}
            style={btnStyle}
        >
            {children}
        </div>
    </>)
}

export default Btn;