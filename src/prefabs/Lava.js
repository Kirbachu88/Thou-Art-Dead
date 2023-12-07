class Lava extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList

        // Initial Frame
        this.play({
            key: 'Wave',
            repeat: -1,
            frameRate: 5,
            startFrame: frame
        })
    }
}