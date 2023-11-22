class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        // Load Assets
        this.load.image('ground', './assets/sprites/Ground.png')

        // Load Aseprite Sheets
        this.load.aseprite('player', './assets/sprites/Player.png', './assets/sprites/Player.json')
        this.load.aseprite('golem', './assets/sprites/Golem.png', './assets/sprites/Golem.json')
        this.load.aseprite('zombie', './assets/sprites/Zombie.png', './assets/sprites/Zombie.json')
        this.load.aseprite('skeleton', './assets/sprites/Skeleton.png', './assets/sprites/Skeleton.json')
    }

    create() {
        // Create Animations
        this.anims.createFromAseprite('player')
        this.anims.createFromAseprite('golem')
        this.anims.createFromAseprite('zombie')
        this.anims.createFromAseprite('skeleton')
    }

    update() {
        this.scene.start('menuScene')
    }
}