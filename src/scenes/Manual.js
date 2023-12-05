class Manual extends Phaser.Scene {
    constructor() {
        super("manualScene");
    }
    
    preload() {

    }

    create() {
        this.input.keyboard.on('keydown', () => {
            this.scene.start('menuScene')
        }, this)

        console.log("Manual")
    }

    update() {

    }
}