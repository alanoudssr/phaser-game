import { CST } from "../CST";
import Phaser from 'phaser';

export default class GhostScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GHOST,
            active: true
        })
    }

    init() {

    }
    preload() {

    }

    // create functions
    create() {
        let { width, height } = this.sys.game.canvas;

        this.cameras.main.setViewport(0, 0, width / 2, height / 2);

        this.add.text(20, 20, "Ghost Scene");

    }

    // update functions 
    update() {

    }
}