import Phaser from "phaser";
import dude from "./assets/dude.png";


// global variables
const width = window.innerWidth
const height = window.innerHeight
let playerLeft;
let playerRight;
let cursors;
let changeable = false;

// setting up config
const configLeft = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: (width / 2),
  height: height,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: {
    preload: preloadLeft,
    create: createLeft,
    update: updateLeft
  }
};

const configRight = { ...configLeft }
configRight.scene = {
  preload: preloadRight,
  create: createRight,
  update: updateRight
}


// game instances
const left = new Phaser.Game(configLeft);
const right = new Phaser.Game(configRight);


// preload functions
function preloadLeft() {
  this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}

function preloadRight() {
  this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
}


// create functions
function createLeft() {
  playerLeft = this.physics.add.sprite(300, 450, 'dude');
  playerLeft.setBounce(0.2);
  playerLeft.setCollideWorldBounds(true);
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

function createRight() {
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
}


// update functions 
function updateLeft() {
  if (changeable) {
    if (cursors.left.isDown) {
      playerLeft.setVelocityX(-160);

      playerLeft.anims.play('left', true);
    }
    else if (cursors.right.isDown) {
      playerLeft.setVelocityX(160);

      playerLeft.anims.play('right', true);
    } else {
      playerLeft.setVelocityX(0);

      playerLeft.anims.play('turn');
    }
  }
}

function updateRight() {
  playerRight.setVelocity(0)
  if (cursors.left.isDown) {
    playerRight.setVelocityX(160);

    playerRight.anims.play('left', true);
    changeable = true
  }
  else if (cursors.right.isDown) {
    playerRight.setVelocityX(-160);

    playerRight.anims.play('right', true);
  } else if (cursors.up.isDown) {
    playerRight.setVelocityY(-160);
  } else if (cursors.down.isDown) {
    playerRight.setVelocityY(160);
  }
  else {
    playerRight.setVelocityX(0);

    playerRight.anims.play('turn');
  }
}