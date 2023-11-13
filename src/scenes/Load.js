class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        // Load Assets

        // Load Aseprite Sheets
        this.load.aseprite('player', './assets/sprites/Player.png', './assets/sprites/Player.json');
    }

    create() {
        // Create Animations
        this.anims.createFromAseprite('player');
    }

    update() {
        this.scene.start('menuScene')
    }
}