import { CST } from "../CST";
import Phaser from 'phaser';

export default class MemoryScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MEMORY,
            active: true
        })
    }

    init(data) {

    }
    preload() {

    }

    // create functions
    create() {
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);
        this.add.text(20, 20, "Memory Scene");

    }

    // update functions 
    update() {

    }
}
