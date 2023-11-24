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

let musicPlaying = false