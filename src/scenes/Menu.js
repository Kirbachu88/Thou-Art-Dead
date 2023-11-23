class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {

    }

    create() {
        this.menu = this.add.sprite(0, 0, 'menu').setScale(4).setOrigin(0, 0).setFrame(1)

        this.timedEvent = this.time.addEvent({ delay: 2500, callback: this.laughEvent, callbackScope: this, loop: true });

        this.menu.on('animationcomplete', () => {
            this.menu.setFrame(1)
        }, this)

        this.input.keyboard.on('keydown', () => {
            this.scene.start('playScene')
        }, this)
    }

    update() {
        
    }

    laughEvent() {
        this.menu.play({
            key: 'Laugh',
            repeat: 3,
        })
    }
}