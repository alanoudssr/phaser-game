import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/Owlet.png";
import sparkle from "../assets/sparkle.png";
import leftMap from "../assets/maps/leftMap.json";
import darkTileSet from "../assets/maps/tilesets/darkTileSet.png";
import blue from "../assets/blue.png";
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
        this.text
        this.checkOverlap = this.checkOverlap.bind(this);
    }

    init() {

    }
    preload() {
        this.load.image("tilesG", darkTileSet);
        this.load.tilemapTiledJSON("mapG", leftMap);
        this.load.spritesheet('ghost', dude, { frameWidth: 32, frameHeight: 30 });
        this.load.spritesheet('sparkle', sparkle, { frameWidth: 32, frameHeight: 48 });
        this.load.image("blue", blue);
        this.load.bitmapFont('desyrel', fontPng, fontXml);
        this.load.spritesheet('mailMan', dude, { frameWidth: 32, frameHeight: 30 });
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
        const sparkle = map.findObject("Objects", obj => obj.name === "waiting for mail");

        const particles = this.add.particles('blue');
        const emitterLeft = particles.createEmitter({
            speedX: { min: -10, max: 10 },
            speedY: { min: -30, max: 10 }, 
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        this.ghost = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'ghost');
        this.sparkle = this.physics.add.sprite(300, 850, 'sparkle');

        camera.startFollow(this.ghost);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        
 
        emitterLeft.startFollow(this.ghost);


        this.sparkle.visible = false
        this.physics.add.overlap(this.ghost, this.sparkle, mailFun, null, this);
        this.text = this.add.text(this.sparkle.x - 25, this.sparkle.y - 50, "Don't touch me")
        this.text.visible = false;

        function mailFun() {
        
            this.text.visible = true
        
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

        this.anims.create({
            key: 'round',
            frames: this.anims.generateFrameNumbers('sparkle', { start: 0, end: 4 }),
            frameRate: 5,
            repeat: -1
        });


        this.sparkle.anims.play('round', true)

    }
    checkOverlap(spriteA, spriteB, range = 100) {
        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        boundsB.width += range;
        boundsB.height += range;
        boundsB.x -= range / 2;
        boundsB.y -= range / 2;
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }
    // update functions 
    update() {
        if (!this.checkOverlap(this.ghost, this.sparkle)) {
            this.text.visible = false;
        }
        if (this.checkOverlap(this.ghost, this.sparkle, 400)) {
            this.sparkle.visible = true;
        } else {
            this.sparkle.visible = false;

        }

        //
        this.t += 0.005;

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
        var pathVector = this.path.getPoint(this.t + ((6 - data.index) * 0.03));

        if (pathVector) {
            data.x = pathVector.x;
            data.y = pathVector.y;
        }

        return data;
    }
}