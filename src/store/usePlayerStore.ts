import { Vector3, Vector3Tuple } from 'three';
import { create } from 'zustand'

interface IPlayerStore {
    player: {
        position: Vector3Tuple;
        rotation: number;
        status: 'Walking'|'Backwards'|'Left'|'Right'|'Running'|'Jumping'|'Idle';
        direction: 'right' | 'left';
    };
    moveRelativeY: (distance: number) => void;
    moveRelativeX: (distance: number) => void;
    rotate: (value: number) => void;
    stopMoving: () => void;
};


export const usePlayerStore = create<IPlayerStore>((set) => ({
   player: {
        position: [0, 8, 0,],
        rotation: 0,
        status: 'Idle',
        direction: 'right',
    },
    moveRelativeY: (distance: number) => set(({ player, }) => {
        const { rotation, position, status } = player;
        if (status !== 'Idle' && status !== 'Walking') {
            return {};
        }
        const forward = new Vector3(-1, 0, 0).applyAxisAngle(new Vector3(0, 1, 0), rotation);
        const newPosition = new Vector3(...position).addScaledVector(forward, distance).toArray();
        if (newPosition[0] < -1000 || newPosition[0] > 1000 ||
            newPosition[2] < -1000 || newPosition[2] > 1000) {
            return { player: { ...player, status: 'Walking' } };
        }
        return {
            player: {
                ...player,
                status: 'Walking',
                position: newPosition,
            },
        }
    }),
    moveRelativeX: (distance: number) => set(({ player, }) => {
        const { rotation, position, status } = player;
        if (status !== 'Idle' && status !== 'Walking') {
            return {};
        }
        const right = new Vector3(0, 0, -1).applyAxisAngle(new Vector3(0, 1, 0), rotation)
        const newPosition = new Vector3(...position).addScaledVector(right, distance).toArray();
        if (newPosition[0] < -1000 || newPosition[0] > 1000 ||
            newPosition[2] < -1000 || newPosition[2] > 1000) {
            return { player: { ...player, status: 'Walking' } };
        }
        return {
            player: {
                ...player,
                status: 'Walking',
                direction: distance >= 0 ? 'right' : 'left',
                position: newPosition,
            },
        }
    }),
    rotate: (value: number) => set(({ player }) => {
        const { rotation, status } = player;
        if (status !== 'Idle' && status !== 'Walking') {
            return {};
        }
        return {
            player: {
                ...player,
                status: 'Walking',
                rotation: rotation + value,
            },
        }
    }),
    stopMoving: () => set(({ player, }) => {
        const { status } = player;
        if (status !== 'Walking') {
            return {};
        }
        return {
            player: {
                ...player,
                status: 'Idle'
            },
        }
    }),
}))