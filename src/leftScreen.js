import config from "./config.js";
const { Phaser, assets, gameConfig } = config
const { dude, leftMap, darkTileSet, blue } = assets


// global variables
const speed = 160;
let playerLeft;
let keyW;
let keyA;
let keyS;
let keyD;
let emitterLeft;
let particles;

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
    this.load.image("tiles", darkTileSet);
    this.load.tilemapTiledJSON("map", leftMap);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    this.load.image('blue', blue);
}

// create functions
function createLeft() {
    const map = this.make.tilemap({ key: "map" });

    const tileset = map.addTilesetImage("darkTileSet", "tiles");

    const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);


    const camera = this.cameras.main;

    console.log("map", map);


    const { width, height } = this.sys.game.config;

    const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
    const waitingMail = map.findObject("Objects", obj => obj.name === "waiting for mail");
    particles = this.add.particles('blue');
    emitterLeft = particles.createEmitter({
        speedX: { min: -100, max: 100 },
        speedY: { min: -100, max: 100 }, 
        scale: { start: 0, end: 1 },
        blendMode: 'ADD'
    })
 
    playerLeft = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'dude');
    camera.startFollow(playerLeft);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    emitterLeft.startFollow(playerLeft);

    this.physics.add.overlap(playerLeft, waitingMail, mailFun, null, this);

    function mailFun() {

    }

    keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

    

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