import { create } from 'zustand';
import { Euler, Vector3 } from 'three';

interface IGlobalStore {
    isLoading: boolean;
    bgm: boolean;
    playerPosition: Vector3;
    cameraPosition: Vector3 | undefined;
    cameraRotation: Euler | undefined;
    progress: number;
    setIsLoading: (state: boolean) => void;
    turnOnOff: (state: boolean) => void;
    setPlayer: (player: any) => void;
    setCamera: (position: Vector3 | undefined, rotation: Euler | undefined) => void;
    setProgress: (progress: number) => void;
};

export const useGlobalStore = create<IGlobalStore>((set) => ({
    bgm: true,
    isLoading: true,
    playerPosition: new Vector3(0),
    cameraPosition: undefined,
    cameraRotation: undefined,
    progress: 0,
    turnOnOff: (state: boolean) => set(() => {
        return {
            bgm: state,
        }
    }),
    setIsLoading: (state: boolean) => set(() => {
        return {
            isLoading: state,
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
    }),
    setProgress: (progress: number) => set(() => {
        return {
            progress
        }
    }),
}));