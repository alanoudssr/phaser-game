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
        this.emitter;
        this.ghost;
        this.keyW;
        this.keyA;
        this.keyS;
        this.keyD;
        this.keyX;
        this.text;
        this.thoughts;
        this.fakeThoughts;
        this.checkOverlap = this.checkOverlap.bind(this);
        this.inControl = true;
    }

    init(data) {
        this.keyW = data.keyW;
        this.keyA = data.keyA;
        this.keyS = data.keyS;
        this.keyD = data.keyD;
        this.keyX = data.keyX;
        this.emitter = data.emitter

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


        console.log('Player controls from the ghost scene', this.registry.get('playerControls'))

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
        const fountain = map.findObject("Objects", obj => obj.name === "Fountain");

        this.thoughts = this.physics.add.group();
        this.fakeThoughts = this.physics.add.group();

        this.fakeThoughts.createMultiple({ key: 'thought', quantity: 5, setXY: { x: 20, y: 50, stepX: 250, stepY: 150 } })
        this.fakeThoughts.createMultiple({ key: 'thought', quantity: 5, setXY: { x: 1000, y: 1000, stepX: -250, stepY: -150 } })

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
        this.deathMan.id = true;
        this.bulliedMan.id = true;
        this.overworkedMan.id = true;
        this.mailMan.id = true;
        this.prayingMan.id = true;
        this.lostLove.id = true;
        this.mayorMan.id = true;
        this.gardenerMan.id = true;
        this.holeMan.id = true;
        this.suicidalMan.id = true;
        this.bulliedMan.name = "Please stop! What have I ever done to you!"
        this.overworkedMan.name = "I am actively putting myself in hell everyday.\nfor what?"
        this.mailMan.name = 'Waiting.. waiting for you..'
        this.prayingMan.name = "Dear God,\nyou are my \nonly solace";
        this.suicidalMan.name = "I can't take this anymore! \nEveryday is the same..\nIt's hopeless";
        this.deathMan.name = "why.."
        this.lostLove.name = "I hate this fountain!\n I hate everything that \nreminds me of you!";
        this.holeMan.name = "OH GOD WHAT IF NO ONE FINDS ME!!!";
        this.mayorMan.name = "I am failing you\n fathers.\nI can't be as good\n as you were";
        this.gardenerMan.name = "Happy thoughts.. Happy thoughts.. Happy thoughts.."

        camera.startFollow(this.ghost);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        emitterLeft.startFollow(this.ghost);

        this.text = this.add.text(waitingMail.x - 25, waitingMail.y - 50, "Don't Touch Me")
        this.text.visible = false;

        this.physics.add.overlap(this.ghost, this.thoughts, (player, thought) => {
            this.text.text = thought.name;
            this.text.x = thought.x - 50;
            this.text.y = thought.y - 50;
            this.text.visible = true;

            if (thought.id) {
                this.emitter.emit('clearCloud')
                thought.id = false
            }

            if(this.keyX.isDown && thought.name == "why.."){
            this.registry.set('ghostControls', false);
            this.registry.set('playerControls', true);
            this.ghost.visible = false
            emitterLeft.visible = false
            }

        }, null, this);

    

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
            frames: this.anims.generateFrameNumbers('thought', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: -1
        });
        this.anims.create({
            key: 'sparkle',
            frames: this.anims.generateFrameNumbers('thought', { start: 4, end: 5 }),
            frameRate: 5,
            repeat: -1
        });

        this.thoughts.playAnimation('sparkle', true)
        this.fakeThoughts.playAnimation('sparkle', true)

    }
    checkOverlap(spriteA, spriteB, range = 100) {
        var children = spriteB.getChildren()
        var boundsB;
        var boundsA = spriteA.getBounds();
        boundsA.width += range;
        boundsA.height += range;
        boundsA.x -= range / 2;
        boundsA.y -= range / 2;
        return (children.map(child => {
            boundsB = child.getBounds()

            if (Phaser.Geom.Intersects.RectangleToRectangle(boundsA, boundsB)) return true
        }).includes(true))

    }

    update() {
        if (!this.checkOverlap(this.ghost, this.thoughts)) {
            this.text.visible = false;
        }
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(0, 0, width / 2, height);

        this.ghost.setVelocity(0)

        if (this.registry.get('ghostControls')) {
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

}