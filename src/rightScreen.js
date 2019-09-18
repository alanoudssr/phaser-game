import config from "./config.js";
const { Phaser, assets, emitter, gameConfig } = config


const { dude, plant } = assets

// global variables
const speed = 160;
let playerRight;
let plantRight;
let cursors;
let controls;

gameConfig.scene = {
    preload: preloadRight,
    create: createRight,
    update: updateRight
}


// game instances
const right = new Phaser.Game(gameConfig);


// preload functions


function preloadRight() {
    this.load.image("tiles", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilesets/tuxmon-sample-32px-extruded.png");
    this.load.tilemapTiledJSON("map", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/tuxemon-town.json");
    this.load.image('plant', plant);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}


// create functions

function createRight() {
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
    cursors = this.input.keyboard.createCursorKeys();
    controls = new Phaser.Cameras.Controls.FixedKeyControl({
        camera: camera,
        left: cursors.left,
        right: cursors.right,
        up: cursors.up,
        down: cursors.down,
        speed: 0.5
    });

    // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


    plantRight = this.physics.add.sprite(10, 543, 'plant');

    playerRight = this.physics.add.sprite(130, 450, 'dude');
    playerRight.setCollideWorldBounds(true);


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


    emitter.on('aPressed', func, this)

    function func(objectRight) {
        plantRight.setVelocityX(speed)
        objectRight.setScale(1.5)
    }
}


// update functions 
function updateRight(time, delta) {
    plantRight.setVelocity(0)
    controls.update(delta);
}

export default right;
