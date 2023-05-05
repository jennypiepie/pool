import * as THREE from 'three';
import { App } from './app';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';

export class Sculpture{

    constructor() {
        const plyLoader = new PLYLoader();
        plyLoader.load(require('@/assets/model/Lucy100k.ply'), (geometry) => {
            geometry.scale(0.024, 0.024, 0.024);
            geometry.computeVertexNormals();
            const material = new THREE.MeshLambertMaterial();
            const mesh = new THREE.Mesh(geometry, material);
            mesh.rotation.y = Math.PI;
            mesh.position.set(-85, 18, -20);
            // mesh.position.y = 18;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
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