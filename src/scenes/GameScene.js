import Phaser from 'phaser';
import { CST } from "../CST";

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME,
            active: false

        })
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
        this.keyX;
        this.keyH;
    }

    init() {


    }
    preload() {

    }

    // create functions
    create() {
  
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        this.keyX = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        const emitter = new Phaser.Events.EventEmitter();

        this.registry.set('ghostControls', true)
        this.registry.set('playerControls', false)

        this.scene.launch(CST.SCENES.MEMORY, {
            keyW: this.keyW,
            keyA: this.keyA,
            keyS: this.keyS,
            keyD: this.keyD,
            keyX: this.keyX,
            keyH: this.keyH,
            emitter
        });
        this.scene.launch(CST.SCENES.GHOST, {
            keyW: this.keyW,
            keyA: this.keyA,
            keyS: this.keyS,
            keyX: this.keyX,
            keyD: this.keyD,
            emitter
        });

    }

    // update functions 
    update() {

    }
}

