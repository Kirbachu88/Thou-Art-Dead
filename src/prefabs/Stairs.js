class Stairs extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame, height, width) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setOrigin(0, 0)
        this.body.setSize(height, width)
        this.body.setImmovable(true)

        this.body.checkCollision.down = false
        this.body.checkCollision.left = false
        this.body.checkCollision.right = false

        this.setAlpha(0)
    }

    update() {

    }
}