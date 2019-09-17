import config from "./config.js";
const { Phaser, assets, emitter, gameConfig } = config


const { dude, plant } = assets

// global variables
const speed = 160;
let playerRight;
let plantRight;
let cursors;
let keyA;

gameConfig.scene = {
    preload: preloadRight,
    create: createRight,
    update: updateRight
}


// game instances
const right = new Phaser.Game(gameConfig);


// preload functions


function preloadRight() {
    this.load.image('plant', plant);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}


// create functions

function createRight() {
    cursors = this.input.keyboard.createCursorKeys();
    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    plantRight = this.physics.add.sprite(10, 543, 'plant');

    playerRight = this.physics.add.sprite(300, 450, 'dude');
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
function updateRight() {
    plantRight.setVelocity(0)
}

export default right;
