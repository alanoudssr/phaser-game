import GhostScene from "./scenes/GhostScene"
import MemoryScene from "./scenes/MemoryScene";
import GameScene from "./scenes/GameScene";
import Phaser from 'phaser';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const config = {
    type: Phaser.AUTO,
    width: WIDTH,
    height: HEIGHT,
    backgroundColor:"#392542",
    scene:[
      GameScene,GhostScene, MemoryScene
    ]
}
const game = new Phaser.Game(config);

window.addEventListener('resize', function (event) {
  game.scale.resize(window.innerWidth, window.innerHeight);
}, false);