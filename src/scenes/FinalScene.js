import { CST } from "../CST";
import Phaser from 'phaser';

export default class FinalScene extends Phaser.Scene {
    constructor(config) {
        super({
            key: CST.SCENES.FINAL,
        });
    }

    init() { }

    preload() { }

    create() {

        this.scene.stop(CST.SCENES.GAME);

        this.mainText = this.add.text(350, 300, "You have made your choice.", { fontSize: '25px' })

    }

    update() { }

}