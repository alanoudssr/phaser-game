import GhostScene from "./scenes/GhostScene"
import MemoryScene from "./scenes/MemoryScene";
import GameScene from "./scenes/GameScene";
import StartScene from "./scenes/StartScene";
import FinalScene from "./scenes/FinalScene";
import Phaser from 'phaser';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;
const config = {
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  pixelArt: true,
  plugins: {
    global: [],
    scene: []
  },
  backgroundColor: "#000000",
  scene: [
    StartScene, GameScene, GhostScene, MemoryScene, FinalScene
  ],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  }
}
const game = new Phaser.Game(config);

window.addEventListener('resize', function (event) {
  game.scale.resize(window.innerWidth, window.innerHeight);
}, false);