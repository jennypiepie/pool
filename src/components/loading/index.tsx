import ReactDOM from 'react-dom';
import './index.scss';
import { useGlobalStore } from '@/src/store/useGlobalStore';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function Loading({ text }: { text: string }) {

  const { progress } = useGlobalStore();
  const requestRef = useRef(0);
  const progressRef = useRef(progress);
  const wave1Ref = useRef<HTMLDivElement>(null);
  const wave2Ref = useRef<HTMLDivElement>(null);
  const rotate = useRef(0);

  const rise = () => {
    rotate.current += 10;
    const prog = progressRef.current;
    const deg = rotate.current;
    const offset = prog * 6.8;
    wave1Ref.current && (wave1Ref.current.style.transform = `translateY(${-offset}px) rotate(${deg / 5}deg)`);
    wave2Ref.current && (wave2Ref.current.style.transform = `translateY(${-offset}px) rotate(${deg / 8}deg)`);
    if (prog < 100) {
      requestRef.current = requestAnimationFrame(rise);
    }
  }

  useEffect(() => {
    requestRef.current = requestAnimationFrame(rise);
    return () => cancelAnimationFrame(requestRef.current);
  }, [])

  useEffect(() => {
    progressRef.current = progress;
    if (progress === 100) {
      setTimeout(() => {
        gsap.to('.loading_container', {
          y: -700,
          opacity: 0,
          duration: 2,
          ease: 'power1.inOut',
        })
      }, 500);
    }
  }, [progress])


  return ReactDOM.createPortal(
    <div className="loading_container">
      <div className="loading_text">
        {text}<br />Loading...
      </div>
      <div className='wave1' ref={wave1Ref} />
      <div className='wave2' ref={wave2Ref} />
      <div className="loading" >
      </div>
    </div>,
    document.body);
}

export default Loading;
