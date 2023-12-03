import { useEffect, useRef, useState } from 'react';
import './index.scss';
import { DeleteOutlined, DownloadOutlined, FolderOpenFilled } from '@ant-design/icons';
import Card from '../card';
// import Preview from '../preview';
interface IWaterFallProps {
    items: any[];
    title: string;
    onClose: () => void;
    itemClick?: (e: React.MouseEvent) => void;
    itemDelete?: (item: any) => void;
}

const download = (url: string) => {
    const a = document.createElement('a')
    const event = new MouseEvent('click')
    a.download = Date.now() + '';
    a.href = url;
    a.dispatchEvent(event);
}

function WaterFall(props: IWaterFallProps) {
    const { items, title, onClose, itemClick, itemDelete } = props;
    const containerRef = useRef<HTMLDivElement>(null);
    const imgWidth = 320;
    // const [previewImg, setPreviewImg] = useState<HTMLElement>();
    // const [preview, setPreiew] = useState(false);
    const [overlay, setOverlay] = useState<number>();

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

    // const openPreview = (e: React.MouseEvent) => {
    //     const origin = e.target as HTMLElement;
    //     setPreviewImg(origin);
    //     setPreiew(true);
    // }

    const click = (e: React.MouseEvent) => {
        if (itemClick) {
            itemClick(e);
            setOverlay(undefined);
        }
    }

    const listRender = items.map((item, index) =>
        <div className="img-wrapper" key={index}
            onMouseEnter={() => setOverlay(index)}
            onMouseLeave={() => setOverlay(undefined)}>
            <img src={item.url} alt='' onLoad={setPosition} />
            {overlay === index && <div className="overlay" key={index}>
                {itemDelete && <div className="o-btn" onClick={() => itemDelete(item)}>
                    <DeleteOutlined />
                </div>}
                <div className="o-btn" onClick={() => download(item.url)}>
                    <DownloadOutlined />
                </div>
            </div>}
        </div>
    );

    useEffect(() => {
        let timeId: any = null;
        window.onresize = function () {
            timeId && clearTimeout(timeId);
            timeId = setTimeout(setPosition, 300);
        }
    }, [])

    return (<>
        {/* {preview && <Preview origin={previewImg} close={() => setPreiew(false)} />} */}
        <Card width={'80vw'} height={'80vh'} title={title} close={onClose}>
            <div className="flow-container" ref={containerRef} onClick={(e) => click(e)}>
                {listRender}
            </div>
            {items.length === 0 && <div className="empty"><FolderOpenFilled /></div>}
        </Card>
    </>)
}

export default WaterFall;