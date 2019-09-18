import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";
import leftMap from "../assets/maps/leftMap.json";
import darkTileSet from "../assets/maps/tilesets/darkTileSet.png";
import fontPng from "../assets/fonts/bitmap/chiller.png"
import fontXml from "../assets/fonts/bitmap/chiller.xml"

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
        this.t = 0;
        this.path;
        this.positionOnPath = this.positionOnPath.bind(this)
    }

    init() {

    }
    preload() {
        this.load.image("tilesG", darkTileSet);
        this.load.tilemapTiledJSON("mapG", leftMap);
        this.load.bitmapFont('desyrel', fontPng, fontXml);
        this.load.spritesheet('ghost', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.spritesheet('mailMan', dude, { frameWidth: 32, frameHeight: 48 });
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

        this.ghost = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'ghost');
        this.mailMan = this.physics.add.sprite(waitingMail.x, waitingMail.y, 'mailMan');

        camera.startFollow(this.ghost);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);



        this.physics.add.overlap(this.ghost, this.mailMan, mailFun, null, this);

        function mailFun() {
            if (!this.overlapTriggered) {

                /// text
                this.path = new Phaser.Curves.Path(waitingMail.x, waitingMail.y);

                this.path.lineTo(waitingMail.x + 1000, waitingMail.y);
                this.path.splineTo([waitingMail.x, waitingMail.y, waitingMail.x, waitingMail.y - 200, waitingMail.x, waitingMail.y - 300, waitingMail.x, waitingMail.y - 400, waitingMail.x, waitingMail.y - 500]);
                this.path.lineTo(waitingMail.x, waitingMail.y);

                var text = this.add.dynamicBitmapText(0, 0, 'desyrel', 'Waiting', 44);

                text.setDisplayCallback(this.positionOnPath);

                var graphics = this.add.graphics();

                graphics.lineStyle(0, 0xffffff, 1);

                this.path.draw(graphics, 128);
                ///



                this.overlapTriggered = true
                console.log('hi');

                setTimeout(() => {
                    this.overlapTriggered = false
                }, 2000);
            }
        }

        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'ghost', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ghost', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });





    }

    // update functions 
    update() {

        //
        this.t += 0.001;

        if (this.t >= (1 - 0.24)) {
            this.t = 0;
        }
        //

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
    positionOnPath(data) {
        var pathVector = this.path.getPoint(this.t + ((6 - data.index) * 0.04));

        if (pathVector) {
            data.x = pathVector.x;
            data.y = pathVector.y;
        }

        return data;
    }
}