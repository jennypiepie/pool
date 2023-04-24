import { Camera } from "./camera";
import { Controls } from "./controls";
import { Light } from "./light";
import { Player } from "./player";
import { Pool } from "./pool";
import { Renderer } from "./renderer";
import { Scene } from "./scene";

export class App{
    public static scene: Scene;
    public static camera: Camera;
    public static renderer: Renderer;
    public static controls: Controls;
    public static lights:Light;
    public static player: Player;
    public static pool: Pool;


    constructor(canvas:HTMLCanvasElement) {
        App.scene = new Scene();
        App.camera = new Camera();
        App.renderer = new Renderer(canvas, App.scene.scene, App.camera.camera);
        App.controls = new Controls(App.camera.camera, canvas);
        App.lights = new Light();
        App.lights.allLights.forEach((light) => {
            App.scene.add(light);
        })
        App.player = new Player();
        App.pool = new Pool();
    }
      
}