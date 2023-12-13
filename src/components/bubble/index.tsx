import './index.scss';

interface IBubbleProps {
    size?: number;
    x?: number;
    delay?: number;
    speed?: number;
}

function Bubble(props: IBubbleProps) {
    const { size = 80, x = 50, delay = 0, speed = 1 } = props;
    const bubbleStyle = {
        width: size,
        height: size,
        left: `${x}vw`,
        animation: `animateBubble ${13 - speed}s linear infinite, sideWays ${3 - speed * 0.2}s ease-in-out infinite alternate`,
        animationDelay: `${delay}s`,
    }

    return (
        <div className="bubble" style={bubbleStyle} />
    )

}

export default Bubble;