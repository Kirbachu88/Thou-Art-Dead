class Zombie extends Enemy {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        this.body.setSize(24, 45).setOffset(14, 5)

        this.velocity = 60

        // Initial Frame
        this.play({
            key: 'ZombieWalk',
            repeat: -1
        })
    }

    update() {
        if(this.isAlive) {
            this.setVelocityX(this.velocity)
        } else {
            this.setVelocityX(0)
            this.setAlpha(this.alpha - 0.01)
        }
    }

    death() {
        if (this.isAlive) {
            this.play({
                key: 'ZombieDeath',
                frameRate: 10
            })
            this.sfxDeath.play()
            score += 25
        }
        this.isAlive = false
    }
}