import { create } from 'zustand';
import { Euler, Vector3 } from 'three';

interface IGlobalStore {
    bgm: boolean;
    changeState: (state: boolean) => void;
    playerPosition: Vector3;
    setPlayer: (player: any) => void;
    setCamera: (position: Vector3 | undefined, rotation: Euler | undefined) => void;
    cameraPosition: Vector3 | undefined;
    cameraRotation: Euler | undefined;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    playerPosition: new Vector3(0),
    cameraPosition: undefined,
    cameraRotation: undefined,
    changeState: (state: boolean) => set(() => {
        return {
            bgm: state,
        }
    }),
    setPlayer: (player: any) => set(() => {
        return {
            playerPosition: player.position
        }
    }),
    setCamera: (position: Vector3 | undefined, rotation: Euler | undefined) => set(() => {
        return {
            cameraPosition: position,
            cameraRotation: rotation,
        }
    })
}));