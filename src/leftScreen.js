import config from "./config.js";
const { Phaser, assets, emitter, gameConfig } = config
const { dude, plant } = assets


// global variables
const speed = 160;
let playerLeft;
let keyW;
let keyA;
let keyS;
let keyD;


// setting up scene config
gameConfig.scene = {
    preload: preloadLeft,
    create: createLeft,
    update: updateLeft
}


// game instances
const left = new Phaser.Game(gameConfig);


// preload functions
function preloadLeft() {
    this.load.image("tiles", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/images/escheresque_dark.png");
    this.load.tilemapTiledJSON("map", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/tilemaps/tuxemon-town.json");


    this.load.image("repeating-background", "https://www.mikewesthad.com/phaser-3-tilemap-blog-posts/post-1/assets/images/escheresque_dark.png");

    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}

// create functions
function createLeft() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
    const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
    // const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);


    const camera = this.cameras.main;

    console.log("map", map);


    const { width, height } = this.sys.game.config;
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
function updateLeft(time, delta) {

    playerLeft.setVelocity(0)


    if (keyA.isDown) {
        playerLeft.setVelocityX(-speed);
        playerLeft.anims.play('left', true);
    }
    else if (keyD.isDown) {
        playerLeft.setVelocityX(speed);
        playerLeft.anims.play('right', true);
    }
    else if (keyW.isDown) {
        playerLeft.setVelocityY(-speed);
    }
    else if (keyS.isDown) {
        playerLeft.setVelocityY(speed);
    }
    else {
        playerLeft.setVelocityX(0);
        playerLeft.anims.play('turn');
    }
}


export default left;