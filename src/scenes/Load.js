class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        // Load Assets
        this.load.image('ground', './assets/sprites/Ground.png')

        // Load Aseprite Sheets
        this.load.aseprite('player', './assets/sprites/Player.png', './assets/sprites/Player.json')
        this.load.aseprite('skeleton', './assets/sprites/Skeleton.png', './assets/sprites/Skeleton.json')
    }

    create() {
        // Create Animations
        this.anims.createFromAseprite('player')
        this.anims.createFromAseprite('skeleton')
    }

    update() {
        this.scene.start('menuScene')
    }
}