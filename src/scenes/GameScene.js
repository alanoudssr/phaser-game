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
        this.scene.launch(CST.SCENES.MEMORY);
        this.scene.launch(CST.SCENES.GHOST);

    }

    // update functions 
    update() {

    }
}
