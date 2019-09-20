import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";
import cloud from "../assets/cloud.png";
import smallCloud from "../assets/cloud3.png";
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
        this.inControll = false
        this.speed = 160;
        // this.keyW ;
        // this.keyA ;
        // this.keyS ;
        // this.keyD;
    }

    init(data) {
        this.keyW =  data.keyW ;
        this.keyA =  data.keyA ;
        this.keyS =  data.keyS ;
        this.keyD =  data.keyD;

    }
    preload() {
        this.load.image("tiles", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png");
        this.load.tilemapTiledJSON("map", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/tuxemon-town.json");
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.image("cloud", cloud);
        this.load.image("smallCloud", smallCloud);
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
        camera.setBounds(0, 0, map.widthInPixels+width/ 2, map.heightInPixels);

        console.log(this)        

        this.suicidalDude = this.physics.add.sprite(830, 40, 'dude');
        this.overworkedDude = this.physics.add.sprite(200, 130, 'dude');
        this.mayorDude = this.physics.add.sprite(1100, 290, 'dude');
        this.prayingDude = this.physics.add.sprite(1170, 1225, 'dude');
        this.lostLoveDude = this.physics.add.sprite(1020, 720, 'dude');
        this.gardenerDude = this.physics.add.sprite(430, 500, 'dude');
        this.bulliedDude = this.physics.add.sprite(900, 1100, 'dude');
        this.mailDude = this.physics.add.sprite(100, 830, 'dude');
        this.deadDude = this.physics.add.sprite(640, 830, 'dude');
        this.playerRight = this.physics.add.sprite(130, 450, 'dude');
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        this.playerRight.setCollideWorldBounds()
        camera.startFollow(this.playerRight);



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
        

        
        this.anims.create({
            key: 'leftP',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'turnP',
            frames: [{ key: 'dude', frame: 4}],
            frameRate: 20
        });

        this.anims.create({
            key: 'rightP',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });

    }

    // update functions 
    update(time, delta) {
        // Resize The Viewport for the Scene
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        this.playerRight.setVelocity(0)

        if (this.inControll){
            if (this.keyA.isDown) {
                this.playerRight.setVelocityX(-this.speed);
                this.playerRight.anims.play('leftP', true);
            }
            else if (this.keyD.isDown) {
                this.playerRight.setVelocityX(this.speed);
                this.playerRight.anims.play('rightP', true);
            }
            else if (this.keyW.isDown) {
                this.playerRight.setVelocityY(-this.speed);
            }
            else if (this.keyS.isDown) {
                this.playerRight.setVelocityY(this.speed);
            }
            else {
                this.playerRight.setVelocityX(0);
                this.playerRight.anims.play('turnP');
            }
        }



        this.controls.update(delta);

    }
}
