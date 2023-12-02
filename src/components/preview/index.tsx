import { useEffect, useRef } from "react";
import Mask from "../mask";

interface IPreviewProps {
    origin?: HTMLElement;
    close: () => void;
}

function Preview(props: IPreviewProps) {
    const { origin, close } = props;
    const maskRef = useRef<HTMLDivElement>(null);
    const clone = origin && origin.cloneNode(true) as HTMLElement;
    const { innerWidth: winWidth, innerHeight: winHeight } = window;
    const { offsetWidth: imgWidth, offsetHeight: imgHeight } = origin!;
    const { top, left } = origin!.getBoundingClientRect();
    const winCenter = { x: winWidth / 2, y: winHeight / 2 };
    const imgCenter = { x: imgWidth / 2 + left, y: imgHeight / 2 + top };
    const d = { left: winCenter.x - imgCenter.x, top: winCenter.y - imgCenter.y };

    const closePreview = () => {
        changeStyle(clone!, [`transform: translate(0px, 0px) scale(1)`]);
        changeStyle(origin!, ['opacity: 1']);
        setTimeout(() => {
            maskRef.current && maskRef.current.removeChild(clone!);
            close();
        }, 300);
    }

    const openPreview = () => {
        changeStyle(origin!, ['opacity: 0']);
        changeStyle(clone!, [`left: ${left}px`, `top: ${top}px`, 'position: absolute', `width: ${imgWidth}px`]);
        maskRef.current!.appendChild(clone!);
        changeStyle(clone!, ['transition: all 0.3s',
            `transform: translate(${d.left}px, ${d.top}px) scale(${adaptScale(origin!)})`]);
    }

    const adaptScale = (ele: HTMLElement) => {
        const { offsetWidth: w, offsetHeight: h } = ele;
        let scale = 0;
        scale = winWidth / w;
        if (h * scale > winHeight - 80) {
            scale = (winHeight - 80) / h;
        }
        return scale;
    }

    const changeStyle = (el: HTMLElement, arr: any[]) => {
        const original = el.style.cssText.split(';')
        original.pop();
        el.style.cssText = original.concat(arr).join(';') + ';'
    }

    useEffect(() => {
        if (origin && clone && origin.tagName === 'IMG') {
            openPreview();
        }
    }, [origin])

    if (!origin || origin.tagName !== 'IMG') {
        return null;
    }

    return (
        <Mask ref={maskRef} customStyle={{ zIndex: 1000 }} onClick={closePreview} />
    )
}

export default Preview;