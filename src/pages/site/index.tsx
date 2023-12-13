import gsap from "gsap";
import './index.scss';
import { useLayoutEffect, useRef } from 'react';
import video from '@/assets/video/1.mp4';
import { useNavigate } from "react-router-dom";

const textList = [
    'Phyllorhiza punctata',
    'Bathykorus bouilloni',
    'Chrysaora fuscescens',
    'Phyllorhiza punctata',
    'Stygiomedusa gigantea',
    'Turritopsis nutricula',
    'Stomolophus meleagris',
    'Tripedalia cystophora',
];

export default function Site() {
    const comp = useRef<HTMLDivElement>(null);
    const enterRef = useRef<HTMLButtonElement>(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const t1 = gsap.timeline();
            enterRef.current?.addEventListener('click', function () {
                t1.to(enterRef.current, {
                    opacity: 0,
                    y: -40,
                    ease: 'expo.easeInOut',
                    duration: 1
                });

                t1.to('.text-wrapper > div', {
                    x: '500',
                    ease: 'expo.easeInOut',
                    stagger: 0.1,
                    duration: 1
                }, 1);

                t1.to('.text-wrapper', {
                    y: -600,
                    scale: 4.5,
                    rotate: -90,
                    ease: 'expo.easeInOut',
                    duration: 2.5,
                }, 1.8);

                t1.to('.text', {
                    opacity: 1,
                    ease: 'expo.easeInOut',
                    duration: 1
                }, 3);

                t1.to('.text-wrapper > div', {
                    x: '-3600',
                    ease: 'expo.easeInOut',
                    duration: 3,
                    stagger: 0.05,
                }, 3.5);

                t1.to('.text-container', {
                    bottom: '-100%',
                    ease: 'expo.easeInOut',
                    duration: 2
                }, 5.5);

                t1.from('span', {
                    y: 400,
                    stagger: {
                        amount: 0.5,
                    },
                    ease: 'power.inOut',
                    duration: 1
                }, '<1.5');

                t1.to('.clipper-left', {
                    clipPath: 'inset(0 100% 0 0)',
                    ease: 'power3.inOut',
                    duration: 2.5
                }, '<2');

                t1.to('.clipper-right', {
                    clipPath: 'inset(0 0 0 100%)',
                    ease: 'power3.inOut',
                    duration: 2.5
                }, '<');

                t1.to('.lt-text, .login-btn', {
                    opacity: 1,
                    duration: 1,
                    ease: 'power1.inOut',
                }, '<2')
            })
        }, comp);
        return () => ctx.revert();
    }, [])

    function toLogin() {
        gsap.to('.site-container', {
            opacity: 0,
            duration: 0.8,
            ease: 'power1.inOut',
        });

        gsap.to('.transition-bg', {
            opacity: 1,
            duration: 0.8,
            ease: 'power1.inOut',
        });

        setTimeout(() => {
            navigate('/login');
        }, 1000);
    }
    return (<>
        <div className="site-container" ref={comp}>
            <button className='enter' ref={enterRef}>ENTER</button>
            <div className="text-container"></div>
            <div className="text-wrapper">
                {new Array(7).fill(0).map((_, index) => {
                    return <Text key={index} />
                })}
            </div>
            <div className="header">
                <div className="clipper clipper-left">
                    <span>P</span>
                    <span>O</span>
                </div>
                <div className="clipper clipper-right">
                    <span>O</span>
                    <span>L</span>
                    <span>.</span>
                </div>
                <div className="video-container">
                    <video src={video} loop muted autoPlay></video>
                </div>
            </div>

            <button className="login-btn" onClick={toLogin}>Login</button>
            <span className="lt-text" style={{ left: '2vw', color: '#0f0f0f' }}>Styx</span>
            <span className="lt-text" style={{ left: '12vw', color: '#fff' }}>Medusa</span>
        </div>
        <div className="transition-bg"></div>
    </>
    )
}

function Text() {
    function randomText() {
        let res = '';
        for (let i = 0; i < 3; i++) {
            res += textList[Math.floor(Math.random() * 8)] + ' ';
        }
        return res;
    }
    return (
        <div className="text">
            {randomText()}
        </div>
    )
}