class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    
    preload() {

    }

    create() {
        this.input.keyboard.on('keydown', () => {
            this.scene.start('menuScene')
        }, this)
    }

    update() {

    }
}