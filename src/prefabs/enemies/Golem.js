class Golem extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.body.setSize(16, 48).setOffset(18, 2)

        this.velocity = 50

        // Initial Frame
        this.play({
            key: 'GolemWalk',
            repeat: -1
        })
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
            this.isAlive = false
            this.play('GolemDeath')
            this.sfxDeath.play()
            score += 25
        }
    }
}