class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {

    }

    create() {
        // add new Player to scene (scene, x, y, key, frame, direction)
        this.player = new Player(this, 200, 150, 'player', 0, 'down').setScale(3)

        // setup keyboard input
        this.keys = this.input.keyboard.createCursorKeys()
        this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
        this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        let playerTextConfig = {
            fontFamily: 'Thou Art Dead',
            fontSize: '26px',
            color: '#670002',
            align: 'right'
        }

        let scoreTextConfig = {
            fontFamily: 'Thou Art Dead',
            fontSize: '29px',
            color: '#670002',
            align: 'right'
        }

        this.playerText = this.add.text(44, height - 55, 'PLAYER 1', playerTextConfig);
        this.scoreText = this.add.text(width - 210, 20, '', scoreTextConfig);
    }

    update() {
        this.scoreText.text = String(score = Phaser.Math.Clamp(score, 0, 99999)).padStart(5, '0')

        // make sure we step (ie update) the hero's state machine
        this.playerFSM.step()
    }
}