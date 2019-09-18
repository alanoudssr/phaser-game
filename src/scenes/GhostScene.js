import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/Owlet.png";
import leftMap from "../assets/maps/leftMap.json";
import darkTileSet from "../assets/maps/tilesets/darkTileSet.png";
import blue from "../assets/blue.png";

export default class GhostScene extends Phaser.Scene {
    constructor(config) {
        super({
            key: CST.SCENES.GHOST,
            active: true
        });
        this.speed = 160;
        this.ghost;
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
    }

    init() {

    }
    preload() {
        this.load.image("tilesG", darkTileSet);
        this.load.tilemapTiledJSON("mapG", leftMap);
        this.load.spritesheet('ghost', dude, { frameWidth: 32, frameHeight: 30 });
        this.load.image("blue", blue);
    }

    // create functions5
    create() {
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(0, 0, width / 2, height);

        const map = this.make.tilemap({ key: "mapG" });

        const tileset = map.addTilesetImage("darkTileSet", "tilesG");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);


        const camera = this.cameras.main;


        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        const waitingMail = map.findObject("Objects", obj => obj.name === "waiting for mail");

        const particles = this.add.particles('blue');
        const emitterLeft = particles.createEmitter({
            speedX: { min: -10, max: 10 },
            speedY: { min: -30, max: 10 }, 
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        this.ghost = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'ghost');
        camera.startFollow(this.ghost);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
 
        emitterLeft.startFollow(this.ghost);

        this.physics.add.overlap(this.ghost, waitingMail, mailFun, null, this);

        function mailFun() {

        }

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'ghost', frame: 7 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ghost', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });





    }

    // update functions 
    update() {
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(0, 0, width / 2, height);

        this.ghost.setVelocity(0)


        if (this.keyA.isDown) {
            this.ghost.setVelocityX(-this.speed);
            this.ghost.anims.play('left', true);
        }
        else if (this.keyD.isDown) {
            this.ghost.setVelocityX(this.speed);
            this.ghost.anims.play('right', true);
        }
        else if (this.keyW.isDown) {
            this.ghost.setVelocityY(-this.speed);
        }
        else if (this.keyS.isDown) {
            this.ghost.setVelocityY(this.speed);
        }
        else {
            this.ghost.setVelocityX(0);
            this.ghost.anims.play('turn');
        }

    }
}