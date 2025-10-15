var config = {
    type: Phaser.CANVAS,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    backgroundColor: '#0f0f0f',
    scene: {
        preload: preload,
        create: create
    }
};

var game = new Phaser.Game(config);

function preload ()
{
        this.load.setBaseURL('https://cdn.phaserfiles.com/v355');
    this.load.plugin('FractalPlugin', 'assets/loader-tests/FractalScenePlugin.js');
    // this.load.plugin('FractalPlugin', 'http://localhost/fractalplugin/dist/FractalPlugin.js');
}

function create ()
{
    this.fractals.createImage(400, 300);
}
