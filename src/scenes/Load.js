class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        // Load Assets

        // Load Aseprite Sheets
        this.load.aseprite('menu', './assets/screens/Main Menu.png', './assets/screens/Main Menu.json')
        this.load.aseprite('player', './assets/sprites/Player.png', './assets/sprites/Player.json')
        this.load.aseprite('golem', './assets/sprites/enemies/Golem.png', './assets/sprites/enemies/Golem.json')
        this.load.aseprite('zombie', './assets/sprites/enemies/Zombie.png', './assets/sprites/enemies/Zombie.json')
        this.load.aseprite('skeleton', './assets/sprites/enemies/Skeleton.png', './assets/sprites/enemies/Skeleton.json')
        
        // Load Tiles
        this.load.image('tilesetImage', './assets/sprites/Tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', './assets/levels/Level 1.json')

        // Load SFX
        this.load.audio('enemyHit', 'assets/sounds/547042__eponn__hit-impact-sword-3.wav')
        this.load.audio('swing', 'assets/sounds/568169__merrick079__sword-sound-2.wav')
        this.load.audio('robot', './assets/sounds/Robot.wav')
        this.load.audio('laugh', './assets/sounds/Laugh.wav')
        this.load.audio('player_death', './assets/sounds/Player Death.wav')
        this.load.audio('oh_yeah', './assets/sounds/Oh Yeah.wav')
        this.load.audio('run_coward', './assets/sounds/Run Coward.wav')

        // Load Music
        this.load.audio('menuBGM', './assets/music/HoliznaCC0 - Gamer 6969.mp3')
        this.load.audio('playBGM', './assets/music/HoliznaCC0 - Dear Mr Super Computer.mp3')
    }

    create() {
        // Create Animations
        this.anims.createFromAseprite('menu')
        this.anims.createFromAseprite('player')
        this.anims.createFromAseprite('golem')
        this.anims.createFromAseprite('zombie')
        this.anims.createFromAseprite('skeleton')
    }

    update() {
        this.scene.start('menuScene')
    }
}