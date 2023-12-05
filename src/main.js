/**********************************************************************************************/
/* Author: Angela Ku
/* Title:  Thou Art Dead
/* Time:   ?
/*
/* Citations
/* - External CSS                       - https://www.w3schools.com/css/css_howto.asp
/* - Phaser 3 Custom Fonts              - https://learn.yorkcs.com/2019/09/28/phaser-3-basics-custom-fonts/
/* - Pad Zeroes                         - https://stackoverflow.com/questions/10073699/pad-a-number-with-leading-zeros-in-javascript
/* - Creating Platforms                 - https://phaser.io/tutorials/making-your-first-phaser-3-game/part1
/* - setFlipX()                         - https://phaser.discourse.group/t/flipx-for-spritesheet-animation/12935/2
/* - Prevent audio pause on focus loss  - https://phaser.discourse.group/t/prevent-audio-from-stopping-on-switching-tabs/186/2
/* - Get current animation frame        - https://phaser.discourse.group/t/is-there-sprite-currentframe/7021
/* - Check if array contains value      - https://stackoverflow.com/questions/18588865/how-to-find-if-x-equals-any-value-in-an-array-in-javascript
/* - body.blocked for tilemap colliders - https://phaser.discourse.group/t/arcade-physics-body-touching-down-not-true-when-using-tilemaps-and-colliders/12022
/* - Add favicon                        - https://www.w3schools.com/html/html_favicon.asp
/* - Loading Screen                     - https://www.patchesoft.com/phaser-3-loading-screen
/* - Patrolling Enemy AI                - https://web.archive.org/web/20190715221905/http://blog.kumansenu.com/2016/04/patrolling-enemy-ai-with-phaser/
/* - setBounds()                        - https://stackoverflow.com/questions/72461245/how-to-make-player-restrict-of-boundries-only-left-right-not-up-and-down-in-phas
/**********************************************************************************************/

let config = {
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true
        }
    },
    width: 800,
    height: 600,
    scale: {autoCenter: Phaser.Scale.CENTER_BOTH},
    scene: [ Load, Menu, Credits, Manual, Play ],
}

// Reserve keyboard vars
let cursors, keys, escKey

let game = new Phaser.Game(config)

let { height, width } = game.config // Destructuring an object and assigning its properties to variables

let platforms

let score = 0
let startingHealth = 100

let musicPlaying = false