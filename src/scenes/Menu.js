class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {
        // Load Music
        this.load.audio('menuBGM', './assets/music/HoliznaCC0 - Gamer 6969.mp3')

        this.sound.pauseOnBlur = false  // Prevent laugh sound from layering if the game is not in focus
    }

    create() {
        // Sounds
        this.sfxRobot = this.sound.add('robot') // "Thou Art Dead"
        this.sfxLaugh = this.sound.add('laugh')

        this.sfxRobot.play({
            volume: 2.0
        })

        // Animation
        this.transitioning = false
        
        // Create Animations
        this.anims.createFromAseprite('menu')
        this.anims.createFromAseprite('lava')
        this.anims.createFromAseprite('player')
        this.anims.createFromAseprite('golem')
        this.anims.createFromAseprite('zombie')
        this.anims.createFromAseprite('skeleton')

        this.menu = this.add.sprite(0, 0, 'menu').setScale(4).setOrigin(0, 0).setFrame(1)

        this.sfxRobot.once('complete', () => {
            let bgm = this.sound.add('menuBGM', {
                loop: true,
                volume: 0.25
            })
            bgm.play()
            this.timedEvent = this.time.addEvent({ delay: 1900, callback: this.laughEvent, callbackScope: this, loop: true })

            spaceBar.once('down', () => {
                this.transitioning = true
                this.timedEvent.paused = true
                this.menu.stop()
                this.sound.stopAll()
                this.time.addEvent({ delay: 120, callback: this.flickerText, callbackScope: this, loop: true })
                this.sfxRobot.play({
                    // Game Start SFX
                    volume: 2.0
                })
                this.sfxRobot.on('complete', () => {
                    this.scene.start('playScene')
                })
            }, this)
        })
        
        this.menu.on('animationcomplete', () => {
            this.menu.setFrame(1)
        }, this)

        // Input
        keys = this.input.keyboard.addKeys('C, M')
        var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)

        // Text
        let menuTextConfig = {
            fontFamily: 'Thou Art Dead',
            fontSize: '26px',
            color: '#670002',
            align: 'right'
        }

        this.infoText = this.add.text(44, 20,            '(M)MANUAL - (C)CREDITS', menuTextConfig)
        this.playerText = this.add.text(44, height - 40, 'PLAYER 1 - PRESS SPACE', menuTextConfig)

        // Reset Values
        score = 0
        startingHealth = 100
    }

    update() {
        if (!this.transitioning) {
            if (keys.C.isDown) {
                this.sound.stopAll()
                this.scene.start('creditsScene');
            }
            if (keys.M.isDown) {
                this.sound.stopAll()
                this.scene.start('manualScene');
            }
        }
    }

    laughEvent() {
        this.sound.play('laugh')
        this.menu.play({
            key: 'Laugh',
            frameRate: 10,
            repeat: 3,
        })
    }

    flickerText() {
        if (this.playerText.alpha == 1) {
            this.playerText.setAlpha(0)
        } else {
            this.playerText.setAlpha(1)
        }

    }
}