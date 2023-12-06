class Skeleton extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.body.setSize(12, 34).setOffset(14, 5)

        this.velocity = 70

        // Initial Frame
        this.play({
            key: 'SkeletonWalk',
            repeat: -1
        })

        // Unique SFX
        this.sfxDeath = scene.sound.add('skeletonHit', {volume: 0.2})
    }

    update() {
        if(this.isAlive) {
            this.setVelocityX(this.velocity)
            this.flipTimer--
        } else {
            this.setVelocityX(0)
            this.setAlpha(this.alpha - 0.01)
        }
    }

    death() {
        if (this.isAlive) {
            this.play({
                key: 'SkeletonDeath',
                frameRate: 10
            })
            this.sfxDeath.play()
            score += 25
        }
        this.isAlive = false
    }
}