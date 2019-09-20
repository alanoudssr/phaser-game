import GhostScene from "./scenes/GhostScene"
import MemoryScene from "./scenes/MemoryScene";
import GameScene from "./scenes/GameScene";
import Phaser from 'phaser';
import StartScene from "./scenes/StartScene";

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
  backgroundColor: "#12113d",
  scene: [
    GameScene, StartScene, GhostScene, MemoryScene
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