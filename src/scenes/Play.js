class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

preload() {

}

create() {
    // Tilemap Info
    const map = this.add.tilemap('tilemapJSON')
    const tileset = map.addTilesetImage('Tileset', 'tilesetImage')

    const bgLayer = map.createLayer('Decorative', tileset, 0, -20).setScale(4)
    const mossLayer = map.createLayer('Moss', tileset, 0, -20).setScale(4)
    const platformLayer = map.createLayer('Platforms', tileset, 0, -20).setScale(4)
    const stairsLayer = map.createLayer('Stairs', tileset, 0, -20).setScale(4)

    // Objects
    const platformObjects = map.getObjectLayer('PlatformObjects')
    const stairsObjects = map.getObjectLayer('StairObjects')
    const enemyObjects = map.getObjectLayer('SpawnEnemies')

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

    // Player
    const playerSpawn = map.findObject('SpawnPlayer', obj => obj.name === 'SpawnPlayer')
    this.player = new Player(this, playerSpawn.x * 4, playerSpawn.y * 4, 'player', 0, 'down').setScale(4)

    // setup keyboard input
    this.keys = this.input.keyboard.createCursorKeys()
    this.keys.HKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H)
    this.keys.FKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

    // Camera
    this.cameras.main.setBounds(0, 0, map.widthInPixels * 4, height)
    this.cameras.main.startFollow(this.player, false, 1, 1, -(width / 7))

    this.physics.world.setBounds(0, 0, map.widthInPixels * 4, height)

    // Platform
    this.platformGroup = this.add.group()
    platformObjects.objects.forEach( (item) => {
        let platform = new Platform(this, item.x * 4 + 16, item.y * 4, null, null, item.width * 4, item.height * 4)
        this.platformGroup.add(platform)
    })

    // Stairs
    this.stairsGroup = this.add.group()
    stairsObjects.objects.forEach( (item) => {
        let stairs = new Stairs(this, item.x * 4, item.y * 4 - 20, null, null, item.width * 4, item.height * 4)
        this.stairsGroup.add(stairs)
    })

    // Collisions
    this.physics.add.collider(this.enemies, this.platformGroup)
    this.physics.add.collider(this.player, this.platformGroup)
    this.physics.add.collider(this.player, this.stairsGroup)
    this.stairsCollider = this.physics.add.collider(this.player, this.stairsGroup)

    this.physics.add.collider(this.enemies, this.player.hitbox, (enemy) => {
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

    // Text
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
}

update() {
    this.scoreText.text = String(score = Phaser.Math.Clamp(score, 0, 99999)).padStart(5, '0')

    // make sure we step (ie update) the hero's state machine
    this.playerFSM.step()
}
}