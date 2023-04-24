import { Renderer } from "./renderer";
import { Scene } from "./scene";

export class App{
    public static scene: Scene;
    public static renderer: Renderer;

    constructor(canvas:HTMLCanvasElement) {
        App.scene = new Scene();
        App.renderer = new Renderer(canvas, App.scene.scene);
    }
      
}