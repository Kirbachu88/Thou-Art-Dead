class Manual extends Phaser.Scene {
    constructor() {
        super("manualScene");
    }
    
    preload() {
        // Text
        let menuTextConfig = {
            fontFamily: 'Thou Art Dead',
            fontSize: '26px',
            color: '#670002',
            align: 'right'
        }

        this.line1 = this.add.text(44, 20,  '     HOW TO PLAY:     ', menuTextConfig)
        this.line1 = this.add.text(44, 60,  'MOVEMENT  - ARROWS L-R', menuTextConfig)
        this.line1 = this.add.text(44, 100, 'CROUCH    - ARROW DOWN', menuTextConfig)
        this.line1 = this.add.text(44, 140, 'JUMP      - SPACE     ', menuTextConfig)
        this.line1 = this.add.text(44, 180, 'ATTACK    - F KEY     ', menuTextConfig)
        this.line1 = this.add.text(44, 220, '       COMBOS:        ', menuTextConfig)
        this.line1 = this.add.text(44, 260, '   CROUCH - ATTACK    ', menuTextConfig)
        this.line1 = this.add.text(44, 300, 'EXECUTE LEAPING ATTACK', menuTextConfig)
        this.line1 = this.add.text(44, 340, '                      ', menuTextConfig)
        this.line1 = this.add.text(44, 380, 'TIP: USE THIS TO COVER', menuTextConfig)
        this.line1 = this.add.text(44, 420, 'GROUND RAPIDLY AND FOR', menuTextConfig)
        this.line1 = this.add.text(44, 460, 'JUMPING OVER HUGE GAPS', menuTextConfig)
        this.line1 = this.add.text(44, 500, '                      ', menuTextConfig)
        this.line1 = this.add.text(44, height - 40, 'RETURN - PRESS ANY KEY', menuTextConfig)
    }

    create() {
        this.input.keyboard.on('keydown', () => {
            this.scene.start('menuScene')
        }, this)
    }

    update() {

    }
}