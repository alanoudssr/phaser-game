import config from "./config.js";
const { Phaser, assets, emitter, gameConfig } = config
const { dude, plant, leftMap, darkTileSet } = assets


// global variables
const speed = 160;
let playerLeft;
let player2;
let overlapTriggered = false;
let keyW;
let keyA;
let keyS;
let keyD;

var bpmText;
var text = "Lorem ipsum ";
var words = [
    'dolor', 'sit', 'amet', 'consectetuer', 'adipiscing', 'elit', 'aenean',
    'commodo', 'ligula', 'eget', 'massa', 'sociis', 'natoque', 'penatibus',
    'et', 'magnis', 'dis', 'parturient', 'montes'];
var run = 5;
var current = 2;

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
    this.load.spritesheet('dude2', dude, { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
    // this.load.bitmapFont('gem', 'assets/fonts/bitmapFonts/gem.png', 'assets/fonts/bitmapFonts/gem.xml');
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
    playerLeft = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'dude');
    player2 = this.physics.add.sprite(waitingMail.x, waitingMail.y, 'dude');
    camera.startFollow(playerLeft);
    camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);


    // this.physics.add.collider(playerLeft, player2);
    this.physics.add.overlap(playerLeft, player2, mailFun, null, this);

    // // 
    // bmpText = this.add.bitmapText(32, 32, 'gem', text, 16);
    // bmpText.maxWidth = 400;

    // //  A visual marker to show where 400px width is
    // var marker = this.add.graphics(432, 0);
    // marker.beginFill(0xa6e22e);
    // marker.drawRect(0, 0, 1, this.height);
    // marker.endFill();

    // //  Write out 200 random words
    // this.time.events.repeat(100, 200, addText, this);
    // // 

    function mailFun() {
        if (!overlapTriggered) {
            this.add.text(spawnPoint.x, spawnPoint.y, 'Hello World', { fontFamily: '"Roboto Condensed"' });
            overlapTriggered = true
            console.log('hi');

            setTimeout(() => {
                overlapTriggered = false
            }, 2000);
        }
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