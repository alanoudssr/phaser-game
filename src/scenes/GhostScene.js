import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/Owlet.png";
import sparkle from "../assets/sparkle.png";
import thought from "../assets/thought.png";
import leftMap from "../assets/maps/leftMap.json";
import darkTileSet from "../assets/maps/tilesets/darkTileSet.png";
import blue from "../assets/blue.png";
import fontPng from "../assets/fonts/bitmap/chiller.png"
import fontXml from "../assets/fonts/bitmap/chiller.xml"

export default class GhostScene extends Phaser.Scene {
    constructor(config) {
        super({
            key: CST.SCENES.GHOST,
            active: true
        });
        this.speed = 160;
        this.ghost;
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
        this.text;
        this.thoughts;
        this.fakeThoughts;
        this.bulliedMan;
        this.overworkedMan;
        this.checkOverlap = this.checkOverlap.bind(this);
    }

    init() {

    }
    preload() {
        this.load.image("tilesG", darkTileSet);
        this.load.tilemapTiledJSON("mapG", leftMap);
        this.load.spritesheet('ghost', dude, { frameWidth: 32, frameHeight: 30 });
        this.load.spritesheet('sparkle', sparkle, { frameWidth: 32, frameHeight: 48 });
        this.load.image("blue", blue);
        this.load.bitmapFont('desyrel', fontPng, fontXml);
        this.load.spritesheet('ghost', dude, { frameWidth: 32, frameHeight: 30 });
        this.load.spritesheet('thought', thought, { frameWidth: 32, frameHeight: 48 });
    }

    create() {

        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(0, 0, width / 2, height);

        const map = this.make.tilemap({ key: "mapG" });

        const tileset = map.addTilesetImage("darkTileSet", "tilesG");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);


        const camera = this.cameras.main;
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        const spawnPoint = map.findObject("Objects", obj => obj.name === "Spawn Point");
       
        const particles = this.add.particles('blue');
        const emitterLeft = particles.createEmitter({
            speedX: { min: -10, max: 10 },
            speedY: { min: -30, max: 10 }, 
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        const waitingMail = map.findObject("Objects", obj => obj.name === "waiting for mail");
        const overworked = map.findObject("Objects", obj => obj.name === "overworked");
        const bullied = map.findObject("Objects", obj => obj.name === "Bullied");
        const praying = map.findObject("Objects", obj => obj.name === "praying");
        const suicidal = map.findObject("Objects", obj => obj.name === "suicidal");
        const death = map.findObject("Objects", obj => obj.name === "Dead Friend");
        const lostLove = map.findObject("Objects", obj => obj.name === "Lost Love");
        const hole = map.findObject("Objects", obj => obj.name === "Hole");
        const mayor = map.findObject("Objects", obj => obj.name === "Crying Statue");
        const gardener = map.findObject("Objects", obj => obj.name === "Gardening");

        this.thoughts = this.physics.add.group();
        this.fakeThoughts = this.physics.add.group();

        this.mailMan = this.fakeThoughts.createMultiple({ key: 'thought', quantity: 5, setXY: { x: 20, y: 50, stepX: 250, stepY: 150 } })
        this.mailMan = this.fakeThoughts.createMultiple({ key: 'thought', quantity: 5, setXY: { x: 1000, y: 1000, stepX: -250, stepY: -150 } })

        this.mailMan = this.thoughts.create(waitingMail.x, waitingMail.y, 'thought')
        this.overworkedMan = this.thoughts.create(overworked.x, overworked.y, 'thought')
        this.bulliedMan = this.thoughts.create(bullied.x, bullied.y, 'thought');
        this.prayingMan = this.thoughts.create(praying.x, praying.y, 'thought');
        this.suicidalMan = this.thoughts.create(suicidal.x, suicidal.y, 'thought');
        this.deathMan = this.thoughts.create(death.x, death.y, 'thought');
        this.lostLove = this.thoughts.create(lostLove.x, lostLove.y, 'thought');
        this.holeMan = this.thoughts.create(hole.x, hole.y, 'thought');
        this.mayorMan = this.thoughts.create(mayor.x, mayor.y, 'thought');
        this.gardenerMan = this.thoughts.create(gardener.x, gardener.y, 'thought');
        this.ghost = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'ghost');
     
        this.ghost.setCollideWorldBounds()

        this.bulliedMan.name = 'bulliedMan'
        this.overworkedMan.name = 'overworkedMan'
        this.mailMan.name = 'mailMan'
        this.prayingMan.name = 'praying'
        this.suicidalMan.name = 'suicidal'
        this.deathMan.name = 'death'
        this.lostLove.name = 'lost love'
        this.holeMan.name = 'hole'
        this.mayorMan.name = 'mayor'
        this.gardenerMan.name = 'gardener'

        camera.startFollow(this.ghost);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        emitterLeft.startFollow(this.ghost);
        
        this.text = this.add.text(waitingMail.x - 25, waitingMail.y - 50, "Don't Touch Me")
        this.text.visible = false;

        this.physics.add.overlap(this.ghost, this.thoughts, (player, thought) => {
            if (thought.name == 'mailMan') {
                this.text.text = 'Waiting.. waiting for you..';
            } else if (thought.name == 'overworkedMan') {
                this.text.text = "I am actively putting myself in hell everyday.\nfor what?";
            } else if (thought.name == 'bulliedMan') {
                this.text.text = "Please stop! What have I ever done to you!";
            } else if (thought.name == 'gardener') {
                this.text.text = "Happy thoughts.. Happy thoughts.. Happy thoughts..";
            } else if (thought.name == 'suicidal') {
                this.text.text = "I can't take this anymore! Everyday is the same..\nIt's hopeless";
            } else if (thought.name == 'mayor') {
                this.text.text = "I am failing you fathers.\nI can't be as good as you were";
            } else if (thought.name == 'praying') {
                this.text.text = "Dear God,\nyou are my only solace";
            } else if (thought.name == 'death') {
                this.text.text = "#*@#!#^&";
            } else if (thought.name == 'lost love') {
                this.text.text = "I hate this fountain!\nI hate everything that reminds me of you!";
            } else if (thought.name == 'hole') {
                this.text.text = "OH GOD WHAT IF NO ONE FINDS ME!!!";
            }
            this.text.x = thought.x - 50;
            this.text.y = thought.y - 50;
            this.text.visible = true;
        }, null, this);


        this.keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('ghost', { start: 0, end: 6 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'ghost', frame: 7 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('ghost', { start: 9, end: 16 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'sparkle',
            frames: this.anims.generateFrameNumbers('thought', { start: 0, end: 6 }),
            frameRate: 5,
            repeat: -1
        });


        this.thoughts.playAnimation('sparkle', true)
        this.fakeThoughts.playAnimation('sparkle', true)

    }
    checkOverlap(spriteA, spriteB, range = 100) {

        var boundsA = spriteA.getBounds();
        var boundsB = spriteB.getBounds();
        boundsB.width += range;
        boundsB.height += range;
        boundsB.x -= range / 2;
        boundsB.y -= range / 2;
        return Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB);
    }

    update() {
        
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(0, 0, width / 2, height);

        this.ghost.setVelocity(0)


        if (this.keyA.isDown) {
            this.ghost.setVelocityX(-this.speed);
            this.ghost.anims.play('left', true);
        }
        else if (this.keyD.isDown) {
            this.ghost.setVelocityX(this.speed);
            this.ghost.anims.play('right', true);
        }
        else if (this.keyW.isDown) {
            this.ghost.setVelocityY(-this.speed);
        }
        else if (this.keyS.isDown) {
            this.ghost.setVelocityY(this.speed);
        }
        else {
            this.ghost.setVelocityX(0);
            this.ghost.anims.play('turn');
        }

    }

}