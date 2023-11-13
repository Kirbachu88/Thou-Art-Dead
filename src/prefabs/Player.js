class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.body.setCollideWorldBounds(true)
        this.setGravityY(1500)

        // Properties
        this.direction
        this.playerVelocity     // in pixels
        this.hurtTimer = 250    // in ms

        // Add SFX

        // Initial Frame

        // Initialize state machine managing player (initial state, possible states, state args[])
        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            duck: new DuckState(),
            attack: new AttackState(),
            lunge: new LungeState(),
            hurt: new HurtState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// player-specific state classes
class IdleState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('walk')
        player.anims.stop()
    }

    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        // transition to attack if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to duck if pressing down
        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('duck')
            return
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown || up.isDown || down.isDown ) {
            this.stateMachine.transition('move')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(FKey)) {
            this.stateMachine.transition('lunge')
            return
        }
    }
}

class MoveState extends State {
    execute(scene, player) {
        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        // transition to attack if pressing space
        if(Phaser.Input.Keyboard.JustDown(space)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to duck if pressing down
        if(Phaser.Input.Keyboard.JustDown(down)) {
            this.stateMachine.transition('duck')
            return
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return
        }

        if(Phaser.Input.Keyboard.JustDown(FKey)) {
            this.stateMachine.transition('lunge')
            return
        }

        // transition to idle if not pressing movement keys
        if(!(left.isDown || right.isDown || up.isDown || down.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        // if(up.isDown) {
        //     moveDirection.y = -1
        //     player.direction = 'up'
        // } else if(down.isDown) {
        //     moveDirection.y = 1
        //     player.direction = 'down'
        // }
        if(left.isDown) {
            moveDirection.x = -1
            player.direction = 'left'
        } else if(right.isDown) {
            moveDirection.x = 1
            player.direction = 'right'
        }
        // normalize movement vector, update player position, and play proper animation
        moveDirection.normalize()
        player.setVelocity(player.playerVelocity * moveDirection.x, player.playerVelocity * moveDirection.y)
        player.anims.play(`walk-${player.direction}`, true)
    }
}

class AttackState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('attack')
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}

class DuckState extends State {
    // Quack quack
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('duck')
    }
}

class HurtState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('hurt')
        player.anims.stop()
        player.setTint(0xFF0000)     // turn red
        // create knockback by sending body in direction opposite source of damage
        // switch(player.direction) {
        //     case 'left':
        //         player.setVelocityX(player.playerVelocity*2)
        //         break
        //     case 'right':
        //         player.setVelocityX(-player.playerVelocity*2)
        //         break
        // }

        // set recovery timer
        scene.time.delayedCall(player.hurtTimer, () => {
            player.clearTint()
            this.stateMachine.transition('idle')
        })
    }
}

class LungeState extends State {
    enter(scene, player) {
        player.body.setVelocity(0)

        // "Once" this animation is complete
        player.anims.play('lunge').once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }
}