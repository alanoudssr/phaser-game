import Phaser from "phaser";
import dude from "./assets/dude.png";
import plant from "./assets/plant.png";

const width = window.innerWidth
const height = window.innerHeight

const gameConfig = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: (width / 2),
    height: height,
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
}

const emitter = new Phaser.Events.EventEmitter();

const assets = {
    dude, plant
}

export default { Phaser, assets, emitter, gameConfig }