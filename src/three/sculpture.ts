import * as THREE from 'three';
import { App } from './app';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

export class Sculpture{

    constructor(model:string,position:number[],rotation:number[],scale:number) {
        const plyLoader = new PLYLoader();
        plyLoader.load(require(`@/assets/model/${model}`), (geometry) => {
            geometry.scale(scale,scale,scale);
            geometry.computeVertexNormals();
            const material = new THREE.MeshLambertMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.set(rotation[0],rotation[1],rotation[2]);
            mesh.position.set(position[0],position[1],position[2]);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            App.scene.colliders.push(mesh);
            App.scene.add(mesh);

            // const spotLight = new THREE.SpotLight( 0xffffff, 5 );
            // spotLight.position.set( 25, 50, 25 );
            // spotLight.angle = Math.PI / 6;
            // spotLight.penumbra = 1;
            // spotLight.decay = 2;
            // spotLight.distance = 100;
            // // spotLight.map = textures[ 'disturb.jpg' ];

            // spotLight.castShadow = true;
            // spotLight.shadow.mapSize.width = 1024;
            // spotLight.shadow.mapSize.height = 1024;
            // spotLight.shadow.camera.near = 10;
            // spotLight.shadow.camera.far = 200;
            // spotLight.shadow.focus = 1;
            // App.scene.add( spotLight );
        });



    }
}