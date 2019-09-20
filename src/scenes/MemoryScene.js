import { CST } from "../CST";
import Phaser from 'phaser';
import dude from "../assets/dude.png";
import cloud from "../assets/cloud.png";
import smallCloud from "../assets/cloud3.png";
import rightMap from "../assets/maps/rightMap.json";
import rightTileSet from "../assets/maps/tilesets/tuxmon-sample-32px-extruded.png";
import praying1 from "../assets/monja1.png";
import praying2 from "../assets/monja2.png";
import mayor from "../assets/mayor.png";
import mayor2 from "../assets/mayor2.png";
import oldMan from "../assets/OldMan.png";
import lover from "../assets/lover.png";
import girl from "../assets/girl.png";
import lover2 from "../assets/lover2.png";
import girl2 from "../assets/girl2.png";
import depressed from "../assets/depressed.png";
import depressed2 from "../assets/depressed2.png";
import bullied from "../assets/bullied.png";
import bully1a from "../assets/bully1.png";
import bully1b from "../assets/bully1-1.png";
import bully2a from "../assets/bully2.png";
import bully2b from "../assets/bully2-1.png";
import mailman1 from "../assets/mailman1.png";
import mailman2 from "../assets/mailman2.png";
import mailman3 from "../assets/mailman3.png";
import mailman4 from "../assets/mailman4.png";
import mailman5 from "../assets/mailman5.png";
import mailman6 from "../assets/mailman6.png";
import mailman7 from "../assets/mailman7.png";
import mailman8 from "../assets/mailman8.png";
import overworked1 from "../assets/old1.png";
import overworked2 from "../assets/old2.png";
import heartbreak from "../assets/break.png";
import heartbreak2 from "../assets/break2.png";
import heartbreak3 from "../assets/break3.png";
import anger from "../assets/anger.png";
import anger2 from "../assets/anger2.png";
import anger3 from "../assets/anger3.png";
import why from "../assets/why.png";
import why2 from "../assets/why2.png";
import why3 from "../assets/why3.png";
import deadDude from "../assets/deadDude.png";
export default class MemoryScene extends Phaser.Scene {
    constructor() {
        super({
            key: CST.SCENES.MEMORY,
        });
        this.playerRight;
        this.cursors;
        this.controls;
        this.inControl = false
        this.speed = 160;
        this.emitter;
        this.emitterRight;
        this.clouds;
        this.counter = 0;
    }

    init(data) {
        this.emitter = data.emitter
        this.keyW = data.keyW;
        this.keyA = data.keyA;
        this.keyS = data.keyS;
        this.keyD = data.keyD;

    }
    preload() {
        this.load.image("tiles", rightTileSet);
        this.load.tilemapTiledJSON("map", rightMap);
        this.load.spritesheet('dude', dude, { frameWidth: 32, frameHeight: 48 });
        this.load.image("cloud", cloud);
        this.load.image("smallCloud", smallCloud);
        this.load.image("praying1", praying1);
        this.load.image("praying2", praying2);
        this.load.image("mayor", mayor);
        this.load.image("lover", lover);
        this.load.image("mayor2", mayor2);
        this.load.image("lover2", lover2);
        this.load.image("mailman1", mailman1);
        this.load.image("oldMan", oldMan);
        this.load.image("girl", girl);
        this.load.image("girl2", girl2);
        this.load.image("overworked1", overworked1);
        this.load.image("overworked2", overworked2);
        this.load.image("anger", anger);
        this.load.image("anger2", anger2);
        this.load.image("anger3", anger3);
        this.load.image("depressed", depressed);
        this.load.image("depressed2", depressed2);
        this.load.image("bullied", bullied);
        this.load.image("bully2a", bully2a);
        this.load.image("bully2b", bully2b);
        this.load.image("bully1a", bully1a);
        this.load.image("bully1b", bully1b);
        this.load.image("mailman2", mailman2);
        this.load.image("mailman3", mailman3);
        this.load.image("mailman4", mailman4);
        this.load.image("mailman5", mailman5);
        this.load.image("mailman6", mailman6);
        this.load.image("mailman7", mailman7);
        this.load.image("mailman8", mailman8);
        this.load.image("heartbreak", heartbreak);
        this.load.image("heartbreak2", heartbreak2);
        this.load.image("heartbreak3", heartbreak3);
        this.load.image("why", why);
        this.load.image("why2", why2);
        this.load.image("why3", why3);
        this.load.image("deadDude", deadDude);
    }

    // create functions
    create() {

        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        const map = this.make.tilemap({ key: "map" });

        const tileset = map.addTilesetImage("tuxmon-sample-32px-extruded", "tiles");

        const belowLayer = map.createStaticLayer("Below Player", tileset, 0, 0);
        const worldLayer = map.createStaticLayer("World", tileset, 0, 0);
        const aboveLayer = map.createStaticLayer("Above Player", tileset, 0, 0);

        const camera = this.cameras.main;
        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels)

        // Set up the arrows to control the camera
        this.cursors = this.input.keyboard.createCursorKeys();
        this.controls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        });

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels + (width / 2), map.heightInPixels);
        const particlesRight = this.add.particles('blue');
        this.emitterRight = particlesRight.createEmitter({
            speedX: { min: -10, max: 10 },
            speedY: { min: -30, max: 10 },
            scale: { start: 1, end: 0 },
            blendMode: 'ADD'
        })

        this.anims.create({
            key: 'bully2-idle',
            frames:
                [
                    { key: 'bully2a' },
                    { key: 'bully2b', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'bully1-idle',
            frames:
                [
                    { key: 'bully1a' },
                    { key: 'bully1b', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'depressed-idle',
            frames:
                [
                    { key: 'depressed' },
                    { key: 'depressed2', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'mayor-idle',
            frames:
                [
                    { key: 'mayor' },
                    { key: 'mayor2', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'overworked-idle',
            frames:
                [
                    { key: 'overworked1' },
                    { key: 'overworked2', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'girl-idle',
            frames:
                [
                    { key: 'girl' },
                    { key: 'girl2', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'praying-idle',
            frames:
                [
                    { key: 'praying1' },
                    { key: 'praying2', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'lover-idle',
            frames:
                [
                    { key: 'lover' },
                    { key: 'lover2', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'heartbreak-idle',
            frames:
                [
                    { key: 'heartbreak' },
                    { key: 'heartbreak2' },
                    { key: 'heartbreak3', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'anger-idle',
            frames:
                [
                    { key: 'anger' },
                    { key: 'anger2' },
                    { key: 'anger3', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'why-idle',
            frames:
                [
                    { key: 'why' },
                    { key: 'why2' },
                    { key: 'why3', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'mailman-idle',
            frames:
                [
                    { key: 'mailman1' },
                    { key: 'mailman2' },
                    { key: 'mailman3' },
                    { key: 'mailman4' },
                    { key: 'mailman5' },
                    { key: 'mailman6' },
                    { key: 'mailman7' },
                    { key: 'mailman8', duration: 1 }
                ],
            frameRate: 2,
            repeat: -1
        });


        // update functions 
        this.playerRight = this.physics.add.sprite(130, 450, 'dude');
        this.suicidalDude = this.physics.add.sprite(830, 40, 'depressed').play('depressed-idle');
        this.overworkedDude = this.physics.add.sprite(200, 130, 'overworked').play('overworked-idle');
        this.anger = this.physics.add.sprite(200, 95, 'anger').play('anger-idle');
        this.mayorDude = this.physics.add.sprite(1100, 290, 'mayor').play('mayor-idle');
        this.prayingDude = this.physics.add.sprite(1170, 1225, 'praying1').play('praying-idle');
        this.lostLoveDude = this.physics.add.sprite(1020, 720, 'lover').play('lover-idle');
        this.heartbreak = this.physics.add.sprite(1020, 680, 'heartbreak').play('heartbreak-idle');
        this.gardenerDude = this.physics.add.sprite(420, 500, 'girl').play('girl-idle');
        this.bulliedDude = this.physics.add.sprite(900, 1100, 'bullied');
        this.firstBullyDude = this.physics.add.sprite(870, 1050, 'bully1a').play('bully1-idle');
        this.secondBullyDude = this.add.sprite(850, 1065, 'bully2a').play('bully2-idle');
        this.mailDude = this.physics.add.sprite(90, 840, 'mailman1').play('mailman-idle');
        this.holeDude = this.physics.add.sprite(125, 1120, 'oldMan');
        this.deadDude = this.physics.add.sprite(620, 830, 'deadDude');
        this.why = this.physics.add.sprite(620, 790, 'why').play('why-idle');


        this.clouds = this.physics.add.group();

        this.overworkedCloud = this.clouds.create(100, 100, 'cloud');
        this.cloud = this.clouds.create(540, 10, 'smallCloud');
        this.suicidalCloud = this.clouds.create(800, 100, 'cloud');
        this.mayorCloud = this.clouds.create(1200, 150, 'cloud');
        this.mailCloud = this.clouds.create(100, 600, 'cloud');
        this.gardenerCloud = this.clouds.create(500, 500, 'cloud');
        this.cloud = this.clouds.create(800, 500, 'cloud');
        this.lostLoveCloud = this.clouds.create(1050, 680, 'cloud');
        this.holeCloud = this.clouds.create(100, 940, 'cloud');
        this.cloud10 = this.clouds.create(500, 990, 'cloud');
        this.bulliedCloud = this.clouds.create(800, 940, 'cloud');
        this.prayingCloud = this.clouds.create(1100, 1200, 'cloud');


        this.emitter.on('clearCloud', () => {
            if (this.counter < this.clouds.getChildren().length) {
                this.clouds.getChildren()[this.counter].visible = false;
                this.counter++;
            }
        }, this)

        worldLayer.setCollisionByProperty({ collides: true });
        this.physics.add.collider(this.playerRight, worldLayer);


        this.emitterRight.startFollow(this.playerRight);


        this.anims.create({
            key: 'leftP',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });

        this.anims.create({
            key: 'turnP',
            frames: [{ key: 'dude', frame: 4 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'rightP',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 5,
            repeat: -1
        });
        this.emitterRight.visible = false
    }

    update(time, delta) {

        this.inControl = this.registry.get('playerControls')


        // Resize The Viewport for the Scene
        let { width, height } = this.sys.game.canvas;
        this.cameras.main.setViewport(width / 2, 0, width, height);

        this.playerRight.setVelocity(0)

        if (this.inControl) {
            this.emitterRight.visible = true
            if (this.keyA.isDown) {
                this.playerRight.setVelocityX(-this.speed);
                this.playerRight.anims.play('leftP', true);
            }
            else if (this.keyD.isDown) {
                this.playerRight.setVelocityX(this.speed);
                this.playerRight.anims.play('rightP', true);
            }
            else if (this.keyW.isDown) {
                this.playerRight.setVelocityY(-this.speed);
            }
            else if (this.keyS.isDown) {
                this.playerRight.setVelocityY(this.speed);
            }
            else {
                this.playerRight.setVelocityX(0);
                this.playerRight.anims.play('turnP');
            }
        }



        this.controls.update(delta);

    }
}
