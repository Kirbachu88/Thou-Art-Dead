class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }
    
    preload() {
        // Loading Bar
		this.graphics = this.add.graphics()
		this.newGraphics = this.add.graphics()
		var progressBar = new Phaser.Geom.Rectangle(200, 110, 400, 50)
		var progressBarFill = new Phaser.Geom.Rectangle(202, 113, 300, 45)

        this.graphics.lineStyle(5, 0x670002, 1)
        this.graphics.strokeRect(200, 110, 400, 50)

		this.newGraphics.fillStyle(0x500002, 1)
		this.newGraphics.fillRectShape(progressBarFill)

		var loadingText = this.add.text(44 , 30,"LOADING", { fontFamily: 'Thou Art Dead', fontSize: '26px', fill: '#670002' })
		var lolText = this.add.text(190, 70,"THOU ART DEAD", { fontFamily: 'Thou Art Dead', fontSize: '26px', fill: '#670002' }).setAlpha(0)
        var anyKeyText = this.add.text(190, height - 40,"PRESS ANY KEY", { fontFamily: 'Thou Art Dead', fontSize: '26px', fill: '#670002' }).setAlpha(0)

		this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText,lolText:lolText,anyKeyText:anyKeyText})

        this.input.keyboard.on('keydown', () => {
            if (this.load.progress == 1)
                this.scene.start('menuScene')
    })

        // Load Assets

        // Load Aseprite Sheets
        this.load.aseprite('menu', './assets/screens/Main Menu.png', './assets/screens/Main Menu.json')
        this.load.aseprite('player', './assets/sprites/Player.png', './assets/sprites/Player.json')
        this.load.aseprite('golem', './assets/sprites/enemies/Golem.png', './assets/sprites/enemies/Golem.json')
        this.load.aseprite('zombie', './assets/sprites/enemies/Zombie.png', './assets/sprites/enemies/Zombie.json')
        this.load.aseprite('skeleton', './assets/sprites/enemies/Skeleton.png', './assets/sprites/enemies/Skeleton.json')
        
        // Load Tiles
        this.load.image('tilesetImage', './assets/sprites/Tileset.png')
        this.load.tilemapTiledJSON('tilemapJSON', './assets/levels/Level 1.json')

        // Load SFX
        this.load.audio('enemyHit', 'assets/sounds/547042__eponn__hit-impact-sword-3.wav')
        this.load.audio('swing', 'assets/sounds/568169__merrick079__sword-sound-2.wav')
        this.load.audio('robot', './assets/sounds/Robot.wav')
        this.load.audio('laugh', './assets/sounds/Laugh.wav')
        this.load.audio('player_death', './assets/sounds/Player Death.wav')
        this.load.audio('oh_yeah', './assets/sounds/Oh Yeah.wav')
        this.load.audio('run_coward', './assets/sounds/Run Coward.wav')

        // Load Music
        this.load.audio('menuBGM', './assets/music/HoliznaCC0 - Gamer 6969.mp3')
        this.load.audio('playBGM', './assets/music/HoliznaCC0 - Dear Mr Super Computer.mp3')
    }

    create() {

    }

    update() {
        // this.scene.start('menuScene')
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0x500002, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(202, 113, percentage*395, 45));
        console.log(percentage)
        if (percentage == 1) {
            this.anyKeyText.setAlpha(1)
        }
        this.lolText.setAlpha(percentage)
        percentage = percentage * 100;
        this.loadingText.setText("INITIAL TESTS INDICATE");
        }
}