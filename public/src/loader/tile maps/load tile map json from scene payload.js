class Example extends Phaser.Scene
{
    constructor ()
    {
        super({
            pack: {
                files: [
                    {
                        type: 'tilemapTiledJSON',
                        key: 'map',
                        url: 'assets/tilemaps/maps/cybernoid.json'
                    },
                    {
                        type: 'image',
                        key: 'tiles',
                        url: 'assets/tilemaps/tiles/cybernoid.png'
                    }
                ]
            }
        });
    }

    create ()
    {
        const map = this.make.tilemap({ key: 'map' });

        const tiles = map.addTilesetImage('cybernoid', 'tiles');

        const layer = map.createLayer(0, tiles, 0, 0);

        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        const cursors = this.input.keyboard.createCursorKeys();

        const controlConfig = {
            camera: this.cameras.main,
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
            speed: 0.5
        };

        this.controls = new Phaser.Cameras.Controls.FixedKeyControl(controlConfig);
    }

    update (time, delta)
    {
        this.controls.update(delta);
    }
}

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#2d2d2d',
    parent: 'phaser-example',
    pixelArt: true,
    scene: Example
};

const game = new Phaser.Game(config);
