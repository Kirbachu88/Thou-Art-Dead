class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

preload() {

}

create() {
    this.physics.world.setBounds(0, 0, width, height, true, true, true, false)

    // Background Structures

    // Tilemap Info
    this.map = this.add.tilemap('tilemapJSON')
    const tileset = this.map.addTilesetImage('Tileset', 'tilesetImage')

    const bgLayer = this.map.createLayer('Background', tileset, 0, -20).setScale(4)
    const decorLayer = this.map.createLayer('Decorative', tileset, 0, -20).setScale(4)
    const mossLayer = this.map.createLayer('Moss', tileset, 0, -20).setScale(4)
    const platformLayer = this.map.createLayer('Platforms', tileset, 0, -20).setScale(4)
    const stairsLayer = this.map.createLayer('Stairs', tileset, 0, -20).setScale(4)
    const fgLayer = this.map.createLayer('Foreground', tileset, 0, -20).setScale(4)

    // Objects
    const platformObjects = this.map.getObjectLayer('PlatformObjects')
    const stairsObjects = this.map.getObjectLayer('StairObjects')
    const edgeObjects = this.map.getObjectLayer('EdgeObjects')
    const lavaObjects = this.map.getObjectLayer('LavaObjects')
    const enemyObjects = this.map.getObjectLayer('SpawnEnemies')

    // Enemies
    this.enemies = this.add.group()
    this.enemies.runChildUpdate = true

    enemyObjects.objects.forEach( (item) => {
        let enemy
        let enemyType = Phaser.Math.RND.integerInRange(0, 2)
        let enemyX = item.x * 4 - 16
        let enemyY = item.y * 3

        if (enemyType == 0) {
            enemy = new Golem(this, enemyX, enemyY, 'golem', 0).setScale(4)
        } else if (enemyType == 1) {
            enemy = new Zombie(this, enemyX, enemyY, 'zombie', 0).setScale(4)
        } else {
            enemy = new Skeleton(this, enemyX, enemyY, 'skeleton', 0).setScale(4)
        }
        this.enemies.add(enemy)
    })

    // Lava (Behind Player)
    lavaObjects.objects.forEach( (item) => {
        let frame = 0
        if (item.name === "Lava2") {
            frame = 1
        }
        let lava = new Lava(this, item.x * 4, item.y * 4 - 22, 'lava', frame).setScale(4).setOrigin(0)
    })

    // Player
    const playerSpawn = this.map.findObject('SpawnPlayer', obj => obj.name === 'SpawnPlayer')
    this.player = new Player(this, playerSpawn.x * 4, playerSpawn.y * 4, 'player', 0, 'down').setScale(4)

    // Health Bar
    this.healthGraphics = this.add.graphics()
    var healthBarFill = new Phaser.Geom.Rectangle(30, 25, 320, 25)

    this.healthGraphics.fillStyle(0x500002, 1)
    this.healthGraphics.fillRectShape(healthBarFill)

    this.updateHealthBar(startingHealth + 10)

    // setup keyboard input
    this.keys = this.input.keyboard.createCursorKeys()
    this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
    this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

    // Camera
    this.cameras.main.setBounds(0, 0, this.map.widthInPixels * 4, height)
    this.cameras.main.startFollow(this.player, false, 1, 1, -(width / 7))

    this.physics.world.setBounds(0, 0, this.map.widthInPixels * 4, height)

    // Platform
    this.platformGroup = this.add.group()
    platformObjects.objects.forEach( (item) => {
        let platform = new Platform(this, item.x * 4 + 16, item.y * 4, null, null, item.width * 4, item.height * 4)
        this.platformGroup.add(platform)
    })

    // Stairs
    this.stairsGroup = this.add.group()
    stairsObjects.objects.forEach( (item) => {
        let stairs = new Platform(this, item.x * 4, item.y * 4 - 20, null, null, item.width * 4, item.height * 4)
        this.stairsGroup.add(stairs)
    })

    // Edges
    this.edgeGroup = this.add.group()
    edgeObjects.objects.forEach( (item) => {
        let edge = new Edge(this, item.x * 4 + 16, item.y * 4, null, null, item.width * 4, item.height * 4)
        this.edgeGroup.add(edge)
    })

    // Collisions
    this.physics.add.collider(this.player, this.platformGroup)
    this.physics.add.collider(this.player, this.stairsGroup)

    this.physics.add.collider(this.enemies, this.platformGroup)
    this.physics.add.overlap(this.enemies, this.edgeGroup, (enemy, edge) => {
        if (enemy.isAlive) {
            enemy.flip()
        }
    })

    // Player Damaged
    this.physics.add.overlap(this.enemies, this.player, (enemy) => {
        if(!['7', '12'].includes(this.player.frame.name) && enemy.isAlive && !this.gameOver) {
            this.updateHealthBar(this.player.health)
            this.player.hurt = true
        }
    })

    // Attacks
    this.physics.add.overlap(this.enemies, this.player.hitbox, (enemy) => {
        if(['7', '12'].includes(this.player.frame.name) && enemy.isAlive) {
            enemy.death()
            this.player.setVelocityX(0)
        }
    })

    // Sound
    let bgm = this.sound.add('playBGM', {
        loop: true,
        volume: 0.25
    })
    bgm.play()

    this.sfxDeath = this.sound.add('player_death', {
        // Attack
        volume: 1
    })

    this.sfxLoop = this.sound.add('oh_yeah')

    // Text & UI
    this.playerText = this.add.text(44, height - 40, 'PLAYER 1', {
        fontFamily: 'Thou Art Dead',
        fontSize: '26px',
        color: '#670002',
        align: 'right'
    }).setScrollFactor(0)
    
    this.scoreText = this.add.text(width - 210, 20, '', {
        fontFamily: 'Thou Art Dead',
        fontSize: '29px',
        color: '#670002',
        align: 'right'
    }).setScrollFactor(0)

    this.healthbar = this.add.image(30, 25, 'healthBar').setOrigin(0, 0).setScale(4).setScrollFactor(0)

    // Game Over flag
    this.gameOver = false
}

update() {
    this.scoreText.text = String(score = Phaser.Math.Clamp(score, 0, 99999)).padStart(5, '0')

    if (!this.gameOver) {
        // make sure we step (ie update) the player's state machine
        this.playerFSM.step()

        if (this.player.x > ((this.map.widthInPixels * 4) - 200)) {
            startingHealth = this.player.health
            this.sound.stopAll()
            this.sfxLoop.play()
            this.scene.restart()
        }

        if (this.player.y > height || this.player.health <= 0) {
            this.cameras.main.stopFollow()
            this.sound.stopAll()
            this.sfxDeath.play()
            this.gameOver = true

            this.timedEvent = this.time.delayedCall(2000, () => {
                this.scene.start('menuScene')
            })
        }
    } else {
        this.player.setAlpha(this.player.alpha - 0.05)
    }
}

updateHealthBar(health) {
    this.healthGraphics.clear();
    this.healthGraphics.fillStyle(0x500002, 1);
    this.healthGraphics.fillRectShape(new Phaser.Geom.Rectangle(30, 25, ((health - 10) / 100)*320, 25)).setScrollFactor(0)
}

}