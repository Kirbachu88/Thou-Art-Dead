class Credits extends Phaser.Scene {
    constructor() {
        super("creditsScene");
    }
    
    preload() {
        // Text
        let menuTextConfig = {
            fontFamily: 'Thou Art Dead',
            fontSize: '26px',
            color: '#670002',
            align: 'right'
        }

        this.line1 = this.add.text(44, 20,  '  MADE BY ANGELA KU   ', menuTextConfig)
        this.line1 = this.add.text(44, 60,  ' ART MADE IN ASEPRITE ', menuTextConfig)
        this.line1 = this.add.text(44, 100, 'SFX:   AYEJAYCEE      ', menuTextConfig)
        this.line1 = this.add.text(44, 140, '    FALLING BAMBOO-CC0', menuTextConfig)
        this.line1 = this.add.text(44, 180, '       MERRICK079     ', menuTextConfig)
        this.line1 = this.add.text(44, 220, '     SWORD SOUND 2-CC0', menuTextConfig)
        this.line1 = this.add.text(44, 260, '       EPONN          ', menuTextConfig)
        this.line1 = this.add.text(44, 300, 'HIT IMPACT SWORD 3-CC0', menuTextConfig)
        this.line1 = this.add.text(44, 340, 'MUSIC: HOLIZNACC0     ', menuTextConfig)
        this.line1 = this.add.text(44, 380, 'DEAR MR SUPER COMPUTER', menuTextConfig)
        this.line1 = this.add.text(44, 420, '      GAMER 6969      ', menuTextConfig)
        this.line1 = this.add.text(44, 460, ' ORIGINAL GAME SOURCE:', menuTextConfig)
        this.line1 = this.add.text(44, 500, ' MONSTER HOUSE (FILM) ', menuTextConfig)
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