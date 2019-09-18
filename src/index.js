import GhostScene from "./scenes/GhostScene"
import MemoryScene from "./scenes/MemoryScene";
import Phaser from 'phaser';

const WIDTH = window.innerWidth;
const HEIGHT = window.innerHeight;

const game = new Phaser.Game({
  type: Phaser.AUTO,
  width: WIDTH,
  height: HEIGHT,
  backgroundColor:"#392542",
  scene:[
    GhostScene, MemoryScene
  ]
});
console.log(game);
window.addEventListener('resize', function (event) {

  game.scale.resize(window.innerWidth, window.innerHeight);

}, false);