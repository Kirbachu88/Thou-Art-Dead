class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setOrigin(0, 0)
        this.body.setSize(14, 34).setOffset(14, 4)

        this.body.setCollideWorldBounds(true)
        this.setGravityY(1500)

        // Properties
        this.direction = 'right'
        this.enemyVelocity = 200 // in pixels

        // Add SFX

        // Initial Frame

        // Initialize state machine managing enemy (initial state, possible states, state args[])
        scene.enemyFSM = new StateMachine('move', {
            move: new EnemyMoveState(),
            death: new EnemyDeathState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

class EnemyMoveState extends State {
    execute(scene, enemy) {
        enemy.anims.play('EnemyWalk')
        // this.stateMachine.transition('death')

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        // if(up.isDown) {
        //     moveDirection.y = -1
        //     enemy.direction = 'up'
        // } else if(down.isDown) {
        //     moveDirection.y = 1
        //     enemy.direction = 'down'
        // }
        // if(left.isDown) {
        //     enemy.setFlipX(true)
        //     moveDirection.x = -1
        //     enemy.direction = 'left'
        // } else if(right.isDown) {
        //     enemy.setFlipX(false)
        //     moveDirection.x = 1
        //     enemy.direction = 'right'
        // }
        // // normalize movement vector, update enemy position, and play proper animation
        // moveDirection.normalize()
        // enemy.setVelocityX(enemy.enemyVelocity * moveDirection.x)
        // if (enemy.body.touching.down) {
        //     enemy.anims.play('Walk', true)
        // }
    }
}

class EnemyDeathState extends State {
    enter(scene, enemy) {
        enemy.setVelocity(0)
        enemy.anims.play('EnemyDeath')
    }

    execute(scene, enemy) {
        if (enemy.direction == 'right') {
            enemy.hitbox.body.position.x = enemy.body.position.x + 15
            enemy.hitbox.body.position.y = enemy.body.position.y - 30
        } else {
            enemy.hitbox.body.position.x = enemy.body.position.x - 50
            enemy.hitbox.body.position.y = enemy.body.position.y - 30
        }
    }
}