class Movement extends Phaser.Scene {
    constructor() {
        super('movementScene')
    }

    init() {
        this.PLAYER_VELOCITY = 350
    }

    preload() {
        this.load.spritesheet('character', './assets/spritesheets/Character_002.png', {
            frameWidth: 48
        })
    }

    create() {
        //console.log('now in movement scene 👍')

        this.cameras.main.setBackgroundColor(0xDDDDDD)
        this.player = this.physics.add.sprite(width/2, height/2, 'character', 1).setScale(2)
        //body -> bounding box
        this.player.body.setCollideWorldBounds(true)
        this.player.body.setSize(32, 32).setOffset(8, 16)

        this.anims.create( {
            key: 'idle-down',
            frameRate: 0,
            repeat: -1, //loop
            frames: this.anims.generateFrameNumbers('character', {
                start: 1,
                end: 1
            })
        })
        this.anims.create( {
            key: 'walk-down',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 0,
                end: 2
            })
        })
        this.anims.create( {
            key: 'walk-up',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 9,
                end: 11
            })
        })
        this.anims.create( {
            key: 'walk-left',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 3,
                end: 5
            })
        })
        this.anims.create( {
            key: 'walk-right',
            frameRate: 10,
            repeat: -1,
            frames: this.anims.generateFrameNumbers('character', {
                start: 6,
                end: 8
            })
        })


        // object stored with primary movement keys, cusors initialized in main
        cursors = this.input.keyboard.createCursorKeys()

    }

    update() {
        /*if (cursors.left.isDown) {
            this.player.x -= this.PLAYER_VELOCITY
        } else if (cursors.right.isDown) {
            this.player.x += this.PLAYER_VELOCITY
        }
        if (cursors.up.isDown) {
            this.player.y -= this.PLAYER_VELOCITY
        } else if (cursors.down.isDown) {
            this.player.y += this.PLAYER_VELOCITY
        }*/

        let playerVector = new Phaser.Math.Vector2(0, 0)
        let playerDirection = 'down'

        if (cursors.left.isDown) {
            playerVector.x = -1
            playerDirection = 'left'
        } else if (cursors.right.isDown) {
            playerVector.x = 1
            playerDirection = 'right'
        }
        if (cursors.up.isDown) {
            playerVector.y = -1
            playerDirection = 'up'
        } else if (cursors.down.isDown) {
            playerVector.y = 1
            playerDirection = 'down'
        }

        playerVector.normalize()

        /*this.player.x += playerVector.x * this.PLAYER_VELOCITY
        this.player.y += playerVector.y * this.PLAYER_VELOCITY*/

        this.player.setVelocity(this.PLAYER_VELOCITY * playerVector.x, this.PLAYER_VELOCITY * playerVector.y)

        let playerMovement
        playerVector.length() ? playerMovement = 'walk' : playerMovement = 'idle' 
        this.player.play(playerMovement + '-' + playerDirection, true)

    }
}