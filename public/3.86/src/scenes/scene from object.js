function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v385');
    this.load.image('face', 'assets/pics/bw-face.png');
}

function create ()
{
    this.add.image(400, 300, 'face');
}

const config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create
    }
};

const game = new Phaser.Game(config);
