import { CST } from "../CST";
import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene { 
    constructor(config) {
        super({
            key: CST.SCENES.START,
            active: true
        });
    }

    init() { }

    preload() { }

    create() { }

    update() { }

}