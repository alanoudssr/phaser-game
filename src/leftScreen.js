import config from "./config.js";
const { Phaser, assets, emitter, gameConfig } = config
const { dude, plant } = assets


// global variables
const speed = 160;
let playerLeft;
let plantLeft;
let cursors;
let keyA;


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
    this.load.image('plant', plant);
    this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}

// create functions
function createLeft() {
    plantLeft = this.physics.add.sprite(10, 543, 'plant');
    plantLeft.name = 'plant'

    playerLeft = this.physics.add.sprite(300, 450, 'dude');
    playerLeft.setCollideWorldBounds(true);


    keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);

    this.physics.add.overlap(playerLeft, plantLeft, interact, null, this);

    function interact() {
        if (keyA.isDown) {
            emitter.emit('aPressed', plantLeft)
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


    cursors = this.input.keyboard.createCursorKeys();

}


// update functions 
function updateLeft() {

    playerLeft.setVelocity(0)
    plantLeft.setVelocity(0)


    if (cursors.left.isDown) {
        playerLeft.setVelocityX(-speed);
        playerLeft.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
        playerLeft.setVelocityX(speed);
        playerLeft.anims.play('right', true);
    }
    else if (cursors.up.isDown) {
        playerLeft.setVelocityY(-speed);
    }
    else if (cursors.down.isDown) {
        playerLeft.setVelocityY(speed);
    }
    else {
        playerLeft.setVelocityX(0);
        playerLeft.anims.play('turn');
    }
}


export default left;