class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)
        
        this.body.setCollideWorldBounds(true)
        this.setGravityY(1500)
    }
    
    update() {

    }
}