import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";

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
        this.load.image("tilesG", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/images/escheresque_dark.png");
        this.load.tilemapTiledJSON("mapG", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/tuxemon-town.json");

        this.load.image("repeating-background", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/images/escheresque_dark.png");

        this.load.spritesheet('ghost', dude, { frameWidth: 32, frameHeight: 48 });
    }

    // create functions5
    create() {
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(0, 0, width / 2, height / 2);

        const map = this.make.tilemap({ key: "mapG" });

        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tilesGs");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);


        const camera = this.cameras.main;

        console.log("mapG", map);


        const bg = this.add.tileSprite(0, 0, map.widthInPixels, map.heightInPixels, "repeating-background");
        bg.setOrigin(0, 0);
        // worldLayer.setCollisionByProperty({ collides: true });
        // aboveLayer.setDepth(10);
        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
        playerLeft = this.physics.add.sprite(300, 450, 'dude');
        this.physics.add.collider(playerLeft, worldLayer);
        camera.startFollow(playerLeft);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        function interact() {
            if (keyA.isDown) {
                // emitter.emit('aPressed', obj)
            }
        }

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });




    }

    // update functions 
    update() {

    }
}