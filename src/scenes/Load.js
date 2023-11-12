class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        // Load Assets

    }

    create() {

    }

    update() {
        this.scene.start('menuScene')
    }
}