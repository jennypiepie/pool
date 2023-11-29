import './index.scss';

interface IBtnGroupProps {
    children: React.ReactElement[];
    childSize?: number;
    gap?: number;
    position: {
        l?: number,
        r?: number,
        t?: number,
        b?: number
    };
}
function BtnGroup(props: IBtnGroupProps) {
    const { children, childSize = 46, gap = 10, position } = props;
    const height = children.length * childSize + gap * (children.length - 1);

    const btnGroupStyle: React.CSSProperties = {
        height: height,
        position: 'absolute',
        left: position.l ? position.l : 'unset',
        right: position.r ? position.r : 'unset',
        top: position.t ? position.t : 'unset',
        bottom: position.b ? position.b : 'unset',
    };

    return (
        <div className="btn_group" style={btnGroupStyle}>{children}</div>
    )
}

export default BtnGroup;