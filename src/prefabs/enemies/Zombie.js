class Zombie extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setOrigin(0, 0)
        this.body.setSize(32, 45).setOffset(14, 5)

        this.body.setCollideWorldBounds(true)
        this.setGravityY(1500)

        // Properties
        this.direction = 'right'
        this.velocity = 200 // in pixels

        // Add SFX

        // Initial Frame
        this.play({
            key: 'ZombieWalk',
            repeat: -1
        })
    }

    update() {
        
    }
}