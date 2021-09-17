import { CustomCoords2D } from "./Coords";
import { canvas, ctx } from "./domElements";

import * as math from 'mathjs';

interface Fractal {
    update():any;
}

export class MandelbrotSet implements Fractal {
    private scale = 1;

    constructor(
        private coords: CustomCoords2D
    ) {}

    update() {
        // calculate each pixel to see if that pixel is in the mandelbrot set. 
        // then draw the pixel if it is. 
        for (let i = 0; i < canvas.width/this.scale; i += this.scale) {
            for (let j = 0; j < canvas.height/this.scale; j += this.scale) {
                const coords = this.coords.canvasToCustom(i,j);
                if (this.calculateMandelbrot(math.complex(coords.x, coords.y))) {
                    ctx.fillRect(i,j,this.scale,this.scale);
                }
            }
        }
    }

    calculateMandelbrot(c : math.Complex) {
        let z = math.complex(0,0);
        // iterations of z=z^2+c
        for (let i = 0; i < 20; i++) {
            z = (math.add(math.multiply(z,z),c) as math.Complex);
        }
        return z.re < 2 && z.im < 2;
    }
}

export class JuliaSet implements Fractal {
    update() {
        this.draw();
    }
    draw() {

    }
}