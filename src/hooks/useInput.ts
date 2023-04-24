import { useEffect, useState } from "react";

export const useInput = () => {
    const [action, setAction] = useState('Idle');

    type Key = 'KeyW' | 'KeyS' | 'KeyA' | 'KeyD' | 'ShiftLeft' | 'Space';

    const keys = {
        KeyW: 'Walking',
        KeyS: 'Backwards',
        KeyA: 'Left',
        KeyD: 'Right',
        ShiftLeft: 'Running',
        Space: 'Jumping',
    }

    useEffect(() => {
        const handleKeyDown = (e: any) => {
            const key = e.code as Key;
            keys[key] ? setAction(keys[key]) : setAction('Idle');
        }
        const handleKeyUp = (e: any) => {
            if (e.code === 'Space') {
                setTimeout(() => setAction('Idle'), 1000);
            } else {
                setAction('Idle');
            }

        }
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('keyup', handleKeyUp);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('keyup', handleKeyUp);
        }
    }, []);
    
    return action;
}