class Golem extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.body.setSize(20, 48).setOffset(16, 2)

        // Initial Frame
        this.play({
            key: 'GolemWalk',
            repeat: -1
        })
    }

    update() {
        if(!this.isAlive) {
            this.setAlpha(this.alpha - 0.01)
        }
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