class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setOrigin(0, 0)

        this.body.setCollideWorldBounds(true)
        this.body.onWorldBounds = true
        this.setGravityY(1500)

        // Properties
        this.direction = 'right'
        this.velocity = 50 // in pixels
        this.isAlive = true

        // Add SFX
        this.sfxDeath = scene.sound.add('enemyHit', {volume: 0.7})
    }

    update() {
        
    }

    death() {
        if (this.isAlive) {
            this.isAlive = false
            this.play(this.deathKey)
            this.sfxDeath.play()
            score += 25
        }
    }
}