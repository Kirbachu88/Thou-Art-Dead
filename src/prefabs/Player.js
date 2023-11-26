class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame)

        scene.add.existing(this)    // Add to existing, displayList, updateList
        scene.physics.add.existing(this)

        this.setOrigin(0, 0)
        this.body.setSize(16, 28).setOffset(21, 14)

        this.hitbox = scene.physics.add.image()
        this.hitbox.body.setSize(100, 100)

        this.stairbox = scene.physics.add.image()
        this.stairbox.body.setSize(64, 10)

        this.body.setCollideWorldBounds(true)
        this.setGravityY(1500)

        // Properties
        this.direction = 'right'
        this.playerVelocity = 200 // in pixels
        this.lungeForceX = 500
        this.lungeForceY = 300
        this.hurtTimer = 250    // in ms
        this.canJump = false
        this.isClimbing = false

        // Add SFX
        this.sfxSwing = scene.sound.add('swing', {
            // Attack
            volume: 0.5
        })

        // Initial Frame

        // Initialize state machine managing player (initial state, possible states, state args[])
        scene.playerFSM = new StateMachine('idle', {
            idle: new IdleState(),
            move: new MoveState(),
            duck: new DuckState(),
            jump: new JumpState(),
            attack: new AttackState(),
            lunge: new LungeState(),
            hurt: new HurtState(),
        }, [scene, this])   // pass these as arguments to maintain scene/object context in the FSM
    }
}

// player-specific state classes
class IdleState extends State {
    enter(scene, player) {
        player.setVelocityX(0)
        if (player.body.velocity.y == 0) {
            player.anims.play('Idle')
        }
        player.anims.stop()
    }

    execute(scene, player) {
        if (player.body.velocity.y == 0 && player.body.blocked.down) {
            player.anims.play('Idle')
        }

        // use destructuring to make a local copy of the keyboard object
        const { left, right, up, down, space, shift } = scene.keys
        const HKey = scene.keys.HKey
        const FKey = scene.keys.FKey

        if(player.body.onFloor) {
            player.canJump = true
        } else {
            player.canJump = false
        }

        if(Phaser.Input.Keyboard.JustDown(FKey)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to duck if pressing down
        if(down.isDown && player.body.blocked.down) {
            this.stateMachine.transition('duck')
            return
        }

        // transition to jump if pressing space
        if(Phaser.Input.Keyboard.JustDown(space) && player.body.blocked.down) {
            this.stateMachine.transition('jump')
            return
        }

        // hurt if H key input (just for demo purposes)
        if(Phaser.Input.Keyboard.JustDown(HKey)) {
            this.stateMachine.transition('hurt')
            return
        }

        // transition to move if pressing a movement key
        if(left.isDown || right.isDown) {
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

        player.stairbox.body.position.x = player.body.position.x
        player.stairbox.body.position.y = player.body.position.y + player.body.height - player.stairbox.body.height

        if(player.body.onFloor) {
            player.canJump = true
        } else {
            player.canJump = false
        }

        if(Phaser.Input.Keyboard.JustDown(FKey)) {
            this.stateMachine.transition('attack')
            return
        }

        // transition to duck if pressing down
        if(Phaser.Input.Keyboard.JustDown(down) && player.body.blocked.down) {
            this.stateMachine.transition('duck')
            return
        }

        // transition to jump if pressing space
        if(Phaser.Input.Keyboard.JustDown(space) && player.body.blocked.down) {
            this.stateMachine.transition('jump')
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
        if(!(left.isDown || right.isDown)) {
            this.stateMachine.transition('idle')
            return
        }

        // handle movement
        let moveDirection = new Phaser.Math.Vector2(0, 0)
        if(up.isDown) {
            player.direction = 'up'
            player.isClimbing = true
            console.log(player.stairbox.body.blocked)
        } else {
            player.isClimbing = false
        }
        // } else if(down.isDown) {
        //     moveDirection.y = 1
        //     player.direction = 'down'
        // }
        if(left.isDown) {
            player.setFlipX(true)
            moveDirection.x = -1
            player.direction = 'left'
        } else if(right.isDown) {
            player.setFlipX(false)
            moveDirection.x = 1
            player.direction = 'right'
        }
        // normalize movement vector, update player position, and play proper animation
        moveDirection.normalize()
        player.setVelocityX(player.playerVelocity * moveDirection.x)
        if (player.body.blocked.down) {
            player.anims.play('Walk', true)
        }
    }
}

class AttackState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.sfxSwing.play()
        player.anims.play('Attack')
        player.once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, player) {
        if (player.direction == 'right') {
            player.hitbox.body.position.x = player.body.position.x + 15
            player.hitbox.body.position.y = player.body.position.y - 30
        } else {
            player.hitbox.body.position.x = player.body.position.x - 68
            player.hitbox.body.position.y = player.body.position.y - 30
        }

    }
}

class DuckState extends State {
    // Quack quack
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('Duck')
    }

    execute(scene, player) {
        if(Phaser.Input.Keyboard.JustDown(scene.keys.space)) {
            this.stateMachine.transition('jump')
        }

        if(Phaser.Input.Keyboard.JustDown(scene.keys.FKey)) {
            this.stateMachine.transition('lunge')
        }

        if(!scene.keys.down.isDown) {
            this.stateMachine.transition('idle')
        }
    }
}

class JumpState extends State {
    enter(scene, player) {
        player.canJump = false
        player.anims.play('Jump')
        player.setVelocityY(-500)
    }

    execute(scene, player) {
        player.stairbox.body.position.x = player.body.position.x
        player.stairbox.body.position.y = player.body.position.y + player.body.height - player.stairbox.body.height


        if(player.body.blocked.down) {
            this.stateMachine.transition('idle')
        }
    }
}

class HurtState extends State {
    enter(scene, player) {
        player.setVelocity(0)
        player.anims.play('Hurt')
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
        player.body.setVelocityY(-player.lungeForceY)

        switch(player.direction) {
            case 'left':
                player.body.setVelocityX(-player.lungeForceX)
                break
            case 'right':
                player.body.setVelocityX(player.lungeForceX)
                break
        }

        player.sfxSwing.play()
        // "Once" this animation is complete
        player.anims.play('Lunge').once('animationcomplete', () => {
            this.stateMachine.transition('idle')
        })
    }

    execute(scene, player) {
        if (player.direction == 'right') {
            player.hitbox.body.position.x = player.body.position.x + 15
            player.hitbox.body.position.y = player.body.position.y - 30
        } else {
            player.hitbox.body.position.x = player.body.position.x - 68
            player.hitbox.body.position.y = player.body.position.y - 30
        }

    }
}