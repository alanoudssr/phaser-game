import Phaser from 'phaser';
import { CST } from "../CST";


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        })
    }

    init() {

    }
    preload() {

    }

    // create functions
    create() {
        const emitter = new Phaser.Events.EventEmitter();
        this.scene.launch(CST.SCENES.START);
        this.scene.launch(CST.SCENES.MEMORY, emitter);
        this.scene.launch(CST.SCENES.GHOST, emitter);

    }

    // update functions 
    update() {

    }
}

