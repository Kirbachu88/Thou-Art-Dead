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

    // add new enemies
    this.golem1 = new Golem(this, 500, 15, 'golem', 0, 'down').setScale(4)
    this.zombie1 = new Zombie(this, 300, 15, 'zombie', 0, 'down').setScale(4)
    this.skeleton1 = new Skeleton(this, 200, 150, 'skeleton', 0, 'down').setScale(4)
    this.skeleton2 = new Skeleton(this, 400, 150, 'skeleton', 0, 'down').setScale(4)

    // add enemies to group
    this.enemies = this.add.group([this.golem1, this.zombie1, this.skeleton1, this.skeleton2])
    this.enemies.runChildUpdate = true

    // add Player to scene (scene, x, y, key, frame)
    const playerSpawn = map.findObject('Spawns', obj => obj.name === 'SpawnPlayer')
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
        console.log(item)
    })

    this.physics.add.collider(this.enemies, this.platformGroup)
    this.physics.add.collider(this.player, this.platformGroup, () => {
        console.log("Platform!")
    })

    // Stairs
    this.stairsGroup = this.add.group()

    stairsObjects.objects.forEach( (item) => {
        let stairs = new Stairs(this, item.x * 4, item.y * 4 - 20, null, null, item.width * 4, item.height * 4)
        this.stairsGroup.add(stairs)
        console.log(item)
    })

    this.physics.add.collider(this.player, this.stairsGroup, () => {
        console.log("Stairs!")
    })
    console.log(this.stairsGroup)

    map.createFromTiles([], null, null, this, this.cameras.main, 'Platforms')

    this.physics.add.collider(this.enemies, this.player.hitbox, (enemy) => {
        if(['7', '12'].includes(this.player.frame.name) && enemy.isAlive) {
            enemy.death()
            console.log("HIT")
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

    this.playerText = this.add.text(44, height - 40, 'PLAYER 1', playerTextConfig).setScrollFactor(0)
    this.scoreText = this.add.text(width - 210, 20, '', scoreTextConfig).setScrollFactor(0)
}

update() {
    this.scoreText.text = String(score = Phaser.Math.Clamp(score, 0, 99999)).padStart(5, '0')

    // make sure we step (ie update) the hero's state machine
    this.playerFSM.step()
}
}