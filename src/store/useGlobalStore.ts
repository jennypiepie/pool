import { create } from 'zustand';
import { Euler, Vector3 } from 'three';

interface IGlobalStore {
    bgm: boolean;
    photoPopVisible: boolean;
    changeState: (state: boolean) => void;
    changePopoverState: (state: boolean) => void;
    playerPosition: Vector3;
    setPlayer: (player: any) => void;
    setCamera: (position: Vector3, rotation: Euler) => void;
    cameraPosition: Vector3 | undefined;
    cameraRotation: Euler | undefined;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    photoPopVisible: false,
    playerPosition: new Vector3(0),
    cameraPosition: undefined,
    cameraRotation: undefined,
    changeState: (state: boolean) => set(() => {
        return {
            bgm: state,
        }
    }),
    changePopoverState: (state: boolean) => set(() => {
        return {
            photoPopVisible: state,
        }
    }),
    setPlayer: (player: any) => set(() => {
        return {
            playerPosition: player.position
        }
    }),
    setCamera: (position: Vector3, rotation: Euler) => set(() => {
        return {
            cameraPosition: position,
            cameraRotation: rotation,
        }
    })
}));