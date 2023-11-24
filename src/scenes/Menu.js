class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        this.sound.pauseOnBlur = false  // Prevent laugh sound from layering if the game is not in focus
    }

    create() {
        // Sounds
        this.sfxRobot = this.sound.add('robot') // "Thou Art Dead"
        this.sfxLaugh = this.sound.add('laugh')

        this.sfxRobot.play()

        // Animation
        this.menu = this.add.sprite(0, 0, 'menu').setScale(4).setOrigin(0, 0).setFrame(1)

        this.sfxRobot.on('complete', () => {
            this.timedEvent = this.time.addEvent({ delay: 1900, callback: this.laughEvent, callbackScope: this, loop: true })
        })
        

        this.menu.on('animationcomplete', () => {
            this.menu.setFrame(1)
        }, this)

        // Keys
        this.input.keyboard.on('keydown', () => {
            this.sound.stopAll()
            this.scene.start('playScene')
        }, this)

        // Text
        let playerTextConfig = {
            fontFamily: 'Thou Art Dead',
            fontSize: '26px',
            color: '#670002',
            align: 'right'
        }

        this.playerText = this.add.text(44, height - 55, 'PLAYER 1 - INSERT COIN', playerTextConfig)
    }

    update() {
        
    }

    laughEvent() {
        this.sound.play('laugh')
        this.menu.play({
            key: 'Laugh',
            frameRate: 10,
            repeat: 3,
        })
    }
}