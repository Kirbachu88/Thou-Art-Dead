class Golem extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setOrigin(0, 0)
        this.body.setSize(20, 48).setOffset(16, 2)

        this.body.setCollideWorldBounds(true)
        this.setGravityY(1500)

        // Properties
        this.direction = 'right'
        this.velocity = 200 // in pixels
        this.isAlive = true

        // Add SFX
        this.sfxDeath = scene.sound.add('enemyHit')

        // Initial Frame
        this.play({
            key: 'GolemWalk',
            repeat: -1
        })
    }

    update() {
        
    }

    death() {
        if (this.isAlive) {
            this.play('GolemDeath')
            this.sfxDeath.play()
            score += 25
        }
        this.isAlive = false
    }
}