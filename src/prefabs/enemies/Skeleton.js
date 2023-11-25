class Skeleton extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.body.setSize(14, 34).setOffset(14, 5)

        // Initial Frame
        this.play({
            key: 'SkeletonWalk',
            repeat: -1
        })
    }

    update() {
        
    }

    death() {
        if (this.isAlive) {
            this.play('SkeletonDeath')
            this.sfxDeath.play()
            score += 25
        }
        this.isAlive = false
    }
}