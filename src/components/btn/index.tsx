import './index.scss';

interface IBtnProps {
    onClick?: () => void;
    children?: React.ReactNode;
    size?: number;
    color?: string;
    customStyle?: any
    YCenter?: boolean;
}

function Btn(props: IBtnProps) {
    const { onClick, children, size = 46, color = 'white', customStyle, YCenter = false } = props;
    const btnStyle = {
        width: size,
        height: size,
        borderRadius: size / 2,
        border: `2px solid ${color}`,
        color: color,
        ...customStyle,
    };

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