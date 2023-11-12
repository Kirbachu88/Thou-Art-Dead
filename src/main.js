/**********************************************************************************************/
/* Author: Angela Ku
/* Title:  Thou Art Dead
/* Time:   ?
/*
/* Citations
/* - 
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

let musicPlaying = false