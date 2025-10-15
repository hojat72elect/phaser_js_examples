class Example extends Phaser.Scene
{
    create ()
    {
        const s1 = `
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D iChannel0;

    varying vec2 outTexCoord;

    #define iTime time
    #define iResolution resolution

    vec4 texture(sampler2D s, vec2 c) { return texture2D(s,c); }

    // Created by Stephane Cuillerdier - @Aiekick/2016
    // License Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License.

    void mainImage( out vec4 f, vec2 g )
    {
        float
            t = time,
            p;

        vec2
            s = iResolution.xy,
            u = (g+g-s)/s.y,
            ar = vec2(
                atan(u.x, u.y) * 3.18 + t*2.,
                length(u)*3. + sin(t*.5)*10.);

        p = floor(ar.y)/5.;

        ar = abs(fract(ar)-.5);

        f =
            mix(
                vec4(1,.3,0,1),
                vec4(.3,.2,.5,1),
                vec4(p))
            * .1/dot(ar,ar) * .1
            + texture(iChannel0, g / s) * .9;
    }

    void main(void)
    {
        mainImage(gl_FragColor, outTexCoord.xy * iResolution.xy);
    }
        `;

        const s2 = `
    precision mediump float;

    uniform float time;
    uniform vec2 resolution;
    uniform sampler2D iChannel0;

    varying vec2 outTexCoord;

    #define iTime time
    #define iResolution resolution

    vec4 texture(sampler2D s, vec2 c) { return texture2D(s,c); }

    void mainImage( out vec4 f, vec2 g )
    {
        f = texture(iChannel0, g/iResolution.xy);
    }

    void main(void)
    {
        mainImage(gl_FragColor, outTexCoord.xy * iResolution.xy);
    }
        `;

        const shader1 = this.add.shader(
            {
                name: 'BufferA',
                fragmentSource: s1,
                setupUniforms: (setUniform, drawingContext) => {
                    setUniform('time', this.game.loop.getDuration());
                },
                initialUniforms: {
                    iChannel0: 0,
                    resolution: [ 512, 512 ]
                }
            },
            0, 0, 512, 512, [ '__DEFAULT' ]
        )
        .setRenderToTexture('shader1');
        const shader2 = this.add.shader(
            {
                name: 'BufferB',
                fragmentSource: s2,
                setupUniforms: (setUniform, drawingContext) => {
                    setUniform('time', this.game.loop.getDuration());
                },
                initialUniforms: {
                    iChannel0: 0,
                    resolution: [ 512, 512 ]
                }
            },
            0, 0, 512, 512, [ 'shader1' ]
        )
        .setRenderToTexture('shader2');

        shader1.setTextures([ 'shader2' ]);

        this.add.image(400, 300, 'shader2');
    }
}

const config = {
    type: Phaser.WEBGL,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    scene: Example
};

const game = new Phaser.Game(config);
