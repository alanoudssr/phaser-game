import Phaser from "phaser";
import dude from "./assets/dude.png";
import plant from "./assets/plant.png";
import leftMap from "./assets/maps/leftMap.json";
import rightMap from "./assets/maps/rightMap.json";
import darkTileSet from "./assets/maps/tilesets/darkTileSet.png";
import DialogModalPlugin from './dialog_plugin'

const width = window.innerWidth
const height = window.innerHeight

const gameConfig = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: (width / 2),
    height: height,
    pixelArt: true,
    plugins: {
        global: [
            //{key, plugin, start}
        ],
        scene: [
            // {
            //     key: 'DialogModalPlugin',
            //     plugin: DialogModalPlugin
            // }
        ]
    },
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
    dude, plant, leftMap, rightMap, darkTileSet
}

export default { Phaser, assets, emitter, gameConfig }