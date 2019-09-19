import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";
import cloud from "../assets/cloud.png";
import rightMap from "../assets/maps/rightMap.json";
import rightTileSet from "../assets/maps/tilesets/tuxmon-sample-32px-extruded.png";

export default class MemoryScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MEMORY,
            active: true
        });
        this.playerRight;
        this.cursors;
        this.controls;

    }

    init() {

    }
    preload() {
        this.load.image("tiles", rightTileSet);
        this.load.tilemapTiledJSON("map", rightMap);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.image("cloud", cloud);
    }

    // create functions
    create() {
        //Set the Viewport size for the scene
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        const map = this.make.tilemap({ key: "map" });

        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Set up the arrows to control the camera
        this.cursors = this.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        });

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels + (width / 2), map.heightInPixels);

        this.playerRight = this.physics.add.sprite(130, 450, 'dude');
        this.cloud1 = this.physics.add.sprite(100, 100, 'cloud');
        this.cloud2 = this.physics.add.sprite(500, 150, 'cloud');
        this.cloud3 = this.physics.add.sprite(800, 100, 'cloud');
        this.cloud4 = this.physics.add.sprite(1200, 150, 'cloud');
        this.cloud5 = this.physics.add.sprite(100, 500, 'cloud');
        this.cloud6 = this.physics.add.sprite(500, 550, 'cloud');
        this.cloud7 = this.physics.add.sprite(800, 500, 'cloud');
        this.cloud8 = this.physics.add.sprite(1200, 550, 'cloud');
        this.cloud9 = this.physics.add.sprite(100, 940, 'cloud');
        this.cloud10 = this.physics.add.sprite(500, 990, 'cloud');
        this.cloud11 = this.physics.add.sprite(800, 940, 'cloud');
        this.cloud12 = this.physics.add.sprite(1200, 990, 'cloud');
        

        // this.anims.create({
        //     key: 'left',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'turn',
        //     frames: [{ key: 'dude', frame: 4 }],
        //     frameRate: 20
        // });

        // this.anims.create({
        //     key: 'right',
        //     frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        //     frameRate: 10,
        //     repeat: -1
        // });

        // this.anims.create({
        //     key: 'round',
        //     frames: this.anims.generateFrameNumbers('cloud', { start: 0, end: 4 }),
        //     frameRate: 5,
        //     repeat: -1
        // });


    }

    // update functions 
    update(time, delta) {
        // Resize The Viewport for the Scene
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        this.controls.update(delta);

    }
}
