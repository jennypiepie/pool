// import { Object3D, Vector3, Vector3Tuple } from 'three';
// import { create } from 'zustand'

// interface IPlayerStore {
//     player: {
//         position: Vector3Tuple;
//         rotation: number;
//         status: 'Walking' | 'Backwards' | 'Left' | 'Right' | 'Running' | 'Jumping' | 'Idle';
//         colliders: Object3D[];
//     };
//     moveRelativeY: (distance: number) => void;
//     move: () => void;
// };


// export const usePlayerStore = create<IPlayerStore>((set) => ({
//     player: {
//         position: [0, 0, 0,],
//         rotation: 0,
//         status: 'Idle',
//         colliders: [],
//     },
//     move: () => set(({ player, }) => {
//         const { position, status,colliders } = player;
//         if (status !== 'Idle' && status !== 'Walking') {
//             return {};
//         }

//         return {
//             player: {
//                 ...player,
//                 status: 'Walking',
//                 position: [0,0,0],
//             },
//         }
//     }),
//     moveRelativeY: (distance: number) => set(({ player, }) => {
//         const { rotation, position, status } = player;
//         if (status !== 'Idle' && status !== 'Walking') {
//             return {};
//         }
//         const forward = new Vector3(-1, 0, 0).applyAxisAngle(new Vector3(0, 1, 0), rotation);
//         const newPosition = new Vector3(...position).addScaledVector(forward, distance).toArray();
//         if (newPosition[0] < -1000 || newPosition[0] > 1000 ||
//             newPosition[2] < -1000 || newPosition[2] > 1000) {
//             return { player: { ...player, status: 'Walking' } };
//         }
//         return {
//             player: {
//                 ...player,
//                 status: 'Walking',
//                 position: newPosition,
//             },
//         }
//     }),
// }))
export {}