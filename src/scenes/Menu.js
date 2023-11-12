class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }
    
    preload() {

    }

    create() {
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
    }
}