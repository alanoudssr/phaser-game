import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";
import cloud from "../assets/cloud.png";
import smallCloud from "../assets/cloud3.png";
import rightMap from "../assets/maps/rightMap.json";
import rightTileSet from "../assets/maps/tilesets/tuxmon-sample-32px-extruded.png";
import praying from "../assets/monja.png";
import mayor from "../assets/mayor.png";
import oldMan from "../assets/OldMan.png";
import mailman from "../assets/mailman.png";
import lover from "../assets/lover.png";
import girl from "../assets/girl.png";
import overworked from "../assets/overworked.png";
import depressed from "../assets/depressed.png";
import bullied from "../assets/bullied.png";
import bully1 from "../assets/bully1.png";
import bully2 from "../assets/bully2.png";

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
        this.load.image("smallCloud", smallCloud);
        this.load.spritesheet("praying", praying, { frameWidth: 28, frameHeight: 30 });
        this.load.image("mayor", mayor);
        this.load.image("lover", lover);
        this.load.image("mailman", mailman);
        this.load.image("oldMan", oldMan);
        this.load.image("girl", girl);
        this.load.image("overworked", overworked);
        this.load.image("depressed", depressed);
        this.load.image("bullied", bullied);
        this.load.image("bully1", bully1);
        this.load.image("bully2", bully2);
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
        this.suicidalDude = this.physics.add.sprite(830, 40, 'depressed');
        this.overworkedDude = this.physics.add.sprite(200, 130, 'overworked');
        this.mayorDude = this.physics.add.sprite(1100, 290, 'mayor');
        this.prayingDude = this.physics.add.sprite(1170, 1225, 'praying');
        this.lostLoveDude = this.physics.add.sprite(1020, 720, 'lover');
        this.gardenerDude = this.physics.add.sprite(420, 500, 'girl');
        this.bulliedDude = this.physics.add.sprite(900, 1100, 'bullied');
        this.firstBullyDude = this.physics.add.sprite(870, 1050, 'bully1');
        this.secondBullyDude = this.physics.add.sprite(850, 1065, 'bully2');
        this.mailDude = this.physics.add.sprite(90, 840, 'mailman');
        this.deadDude = this.physics.add.sprite(640, 850, 'oldMan');
        // this.overworkedCloud = this.physics.add.sprite(100, 100, 'cloud');
        // this.cloud = this.physics.add.sprite(540, 10, 'smallCloud');
        // this.suicidalCloud = this.physics.add.sprite(800, 100, 'cloud');
        // this.mayorCloud = this.physics.add.sprite(1200, 150, 'cloud');
        // this.mailCloud = this.physics.add.sprite(100, 600, 'cloud');
        // this.gardenerCloud = this.physics.add.sprite(500, 500, 'cloud');
        // this.cloud = this.physics.add.sprite(800, 500, 'cloud');
        // this.lostLoveCloud = this.physics.add.sprite(1050, 680, 'cloud');
        // this.holeCloud = this.physics.add.sprite(100, 940, 'cloud');
        // this.cloud10 = this.physics.add.sprite(500, 990, 'cloud');
        // this.bulliedCloud = this.physics.add.sprite(800, 940, 'cloud');
        // this.prayingCloud = this.physics.add.sprite(1100, 1200, 'cloud');


    }

    // update functions 
    update(time, delta) {
        // Resize The Viewport for the Scene
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        this.controls.update(delta);

    }
}
