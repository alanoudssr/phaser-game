import Phaser from 'phaser';
import { CST } from "../CST";


export default class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.GAME
        })
        this.keyW ;
        this.keyA ;
        this.keyS ;
        this.keyD;
    }

    init() {
        

    }
    preload() {

    }

    // create functions
    create() {
        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        
        this.registry.set('ghostControls', true)
        this.registry.set('playerControls', false)


        this.scene.launch(CST.SCENES.START);

        this.scene.launch(CST.SCENES.MEMORY ,{keyW:this.keyW ,
            keyA:this.keyA ,
            keyS:this.keyS ,
            keyD:this.keyD});
        this.scene.launch(CST.SCENES.GHOST,{keyW:this.keyW ,
            keyA:this.keyA ,
            keyS:this.keyS ,
            keyD:this.keyD} );

    }

    // update functions 
    update() {

    }
}

