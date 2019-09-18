import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";
import rightMap from "../assets/maps/rightMap.json";

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
        this.load.image("tiles", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png");
        this.load.tilemapTiledJSON("map", rightMap);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
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
        camera.setBounds(0, 0, map.widthInPixels+(width/ 2), map.heightInPixels);

        this.playerRight = this.add.sprite(130, 450, 'dude');


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



    }

    // update functions 
    update(time, delta) {
        // Resize The Viewport for the Scene
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        this.controls.update(delta);

    }
}
