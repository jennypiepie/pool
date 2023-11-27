import { useEffect, useRef } from 'react';
import './index.scss';
import { FolderOpenFilled } from '@ant-design/icons';

interface IWaterFallProps {
    urls: string[];
    title: string;
    onClose: () => void;
}

function WaterFall(props: IWaterFallProps) {
    const { urls, title, onClose } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const imgWidth = 320;

    const calc = () => {
        if (!containerRef.current) return;
        const containerWidth = containerRef.current.clientWidth;
        const columns = Math.floor(containerWidth / imgWidth);
        const gapNum = columns + 1;
        const leftSpace = containerWidth - columns * imgWidth;
        const gap = Math.floor(leftSpace / gapNum * 100) / 100;
        return {
            gap,
            columns
        }
    }

    const setPosition = () => {
        const info = calc();
        if (!info || !containerRef.current) return;
        const nextTops = new Array(info.columns);
        nextTops.fill(0);
        for (let i = 0; i < containerRef.current.children.length; i++) {
            const img = containerRef.current.children[i] as HTMLDivElement;
            const minTop = Math.min.apply(null, nextTops);
            img.style.top = minTop + 'px';
            const index = nextTops.indexOf(minTop);
            nextTops[index] += (img.children[0] as HTMLImageElement).height + 10;
            const left = (index + 1) * info.gap + index * imgWidth;
            img.style.left = left + 'px';
        }
    }

    const listRender = urls.map((item, index) =>
        <div className="img-wrapper" key={index}>
            <img src={item}
                alt=''
                onLoad={setPosition}
            />
        </div>
    );

    useEffect(() => {
        let timeId: any = null;
        window.onresize = function () {
            if (timeId) {
                clearTimeout(timeId);
            }
            timeId = setTimeout(setPosition, 300);
        }
    }, [])

    return (<>
        <div className="wrapper">
            <div className="flow-title">{title}</div>
            <div className="close_btn" onClick={onClose}>X</div>
            <div className="flow-container" ref={containerRef}>
                {listRender}
            </div>
            {urls.length === 0 && <div className="empty"><FolderOpenFilled /></div>}
        </div>
    </>)
}

export default WaterFall;