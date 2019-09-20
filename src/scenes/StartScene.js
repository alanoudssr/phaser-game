import { CST } from "../CST";
import Phaser from 'phaser';

export default class StartScene extends Phaser.Scene {
    constructor(config) {
        super({
            key: CST.SCENES.START,
        });
        this.text;
        this.cameras;
        this.timer = 10
    }

    init() { }

    preload() { }

    create() {
        // let { width, height } = this.sys.game.canvas;
        // this.cameras.main.setViewport(width, 0, width, height);
        this.scene.stop(CST.SCENES.GAME);
        this.keyQ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

        this.mainText = this.add.text(350, 300, "Neutral being\nWe don't encounter much like you\nBut on the rare occasions that we do\nWe allow intervenes\nDamnation or redemption\nIt is in your hand\nMake your choice wisely\nThis is your only chance.", { fontSize: '25px' })
        this.refreshId = setInterval(() => {
            this.timer--;
            if (this.timer == 0) {
                this.scene.start(CST.SCENES.GAME);
                clearInterval(this.refreshId);
            }
        }, 1000);
    }

    update() { }

}