// import { Object3D, Raycaster, Vector3, Vector3Tuple } from 'three';
import { Vector3 } from 'three'
import { create } from 'zustand'

interface IPlayerStore {
//     player: {
//         position: Vector3Tuple;
//         rotation: number;
//         status: 'Walking' | 'Backwards' | 'Left' | 'Right' | 'Running' | 'Jumping' | 'Idle';
//         colliders: Object3D[];
//     };
//     moveRelativeY: (distance: number) => void;
//     move: (action: string,dt: number) => void;
    
    player: {
        position: Vector3;
        rotateY: number;
    };
    setPosition: (position: Vector3, rotateY: number) => void;
};


export const usePlayerStore = create<IPlayerStore>((set) => ({
    player: {
        position: new Vector3(),
        rotateY: 0,
//         status: 'Idle',
//         colliders: [],
    },

    setPosition: (position: Vector3,rotateY:number) => set(() => {
        return {
            player: {
                position,
                rotateY
            }
        }
    }),
//     move: (action: string,dt: number) => set(({ player, }) => {
//         // const { position, status,colliders } = player;
//         // if (status !== 'Idle' && status !== 'Walking') {
//         //     return {};
//         // }

//         // function move(action: string,dt: number) {
//         const { position, status,colliders } = player;
        
//         const p1 = new Vector3(...position);
//         const p2 = camera.position;
//         const v1 = p1.clone().sub(p2);
//         v1.y = 0;
//         const v2 = new Vector3(v1.z, 0, -v1.x);
//         let dir = v1;
//         let step = 3;
//         let blocked = false;
//         let vy = 0;
//         const gravity = 70;

//         switch (action) {
//             case 'Walking':
//                 dir = v1.normalize();
//                 break;
//             case 'Backwards':
//                 dir = v1.negate().normalize();
//                 step = 2;
//                 break;
//             case 'Left':
//                 dir = v2.normalize();
//                 break;
//             case 'Right':
//                 dir = v2.negate().normalize();
//                 break;
//             case 'Running':
//                 dir = v1.normalize();
//                 step = 10;
//                 break;
//             default:
//                 return;
//         }
//         // console.log(dir);

//         //水平方向碰撞检测
//         const rayOrigin = p1.clone();
//         rayOrigin.y += 5;
//         const raycaster = new Raycaster();
//         raycaster.set(rayOrigin, dir);
//         const intersects = raycaster.intersectObjects(colliders);

//         // console.log(intersects);

//         if (intersects.length > 0) {
//             if (intersects[0].distance < 5) blocked = true;
//         }
        
//         //垂直方向碰撞检测
//         const dir2 = new Vector3(0, -1, 0);
//         const rayOrigin2 = p1.clone();
//         rayOrigin2.y += 10;
//         const raycaster2 = new Raycaster();
//         raycaster2.set(rayOrigin2, dir2);
//         const intersects2 = raycaster2.intersectObjects(colliders);
//         // console.log(intersects2);
//         const targetY = rayOrigin2.y - intersects2[0].distance;
//         if (targetY > p1.y) {
//             p1.y = 0.8 * p1.y + 0.2 * targetY
//             vy = 0;
//         } else {
//             vy += dt * gravity;
// 			p1.y -= vy;
//             if (p1.y < targetY) {
//                 vy = 0;
//                 p1.y = targetY;
//             }
//         }


//         // rotateModel()
//         if (!blocked) {
//             p1.x += dir.x * step * 0.1;
//             p2.x += dir.x * step * 0.1;
//             p1.z += dir.z * step * 0.1;
//             p2.z += dir.z * step * 0.1;
//             //@ts-ignore
//             props.controlsRef.current.target.set(...p1);
//         }

//     // }

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
}))