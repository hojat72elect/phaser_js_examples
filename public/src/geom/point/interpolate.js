class Example extends Phaser.Scene
{
    t = 0.5;
    interpolatedPoint;
    point2;
    point1;
    graphics;

    create ()
    {
        this.graphics = this.add.graphics({ lineStyle: { width: 3, color: 0x2266aa }, fillStyle: { color: 0x2266aa } });

        this.point1 = new Phaser.Math.Vector2(400, 300);

        this.point2 = new Phaser.Math.Vector2(550, 300);

        this.interpolatedPoint = this.point1.clone().lerp(this.point2, this.t);

        this.input.on('pointermove', pointer =>
        {

            this.point2.copy(pointer);

        });
    }

    update ()
    {
        this.graphics.clear();

        this.t = (this.t + 0.01) % 1;

        this.interpolatedPoint = this.point1.clone().lerp(this.point2, this.t);

        this.graphics.fillPointShape(this.point1, 20);
        this.graphics.fillPointShape(this.point2, 20);

        this.graphics.fillStyle(0x00aa00);
        this.graphics.fillPointShape(this.interpolatedPoint, 20);

        this.graphics.lineBetween(this.point1.x, this.point1.y, this.point2.x, this.point2.y);
    }
}

const config = {
    width: 800,
    height: 600,
    type: Phaser.AUTO,
    parent: 'phaser-example',
    scene: Example
};

const game = new Phaser.Game(config);
