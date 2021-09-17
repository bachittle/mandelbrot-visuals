import { CustomCoords2D } from "./Coords";
import { canvas, ctx } from "./domElements";

import * as math from 'mathjs';
import { settings } from "./settings";

interface Fractal {
    update():any;
}

export class MandelbrotSet implements Fractal {
    static updateCounter = 3;

    constructor(
        private coords: CustomCoords2D
    ) {
        setInterval(()=>{
            if (MandelbrotSet.updateCounter < settings.grid.scale / 10) {
                MandelbrotSet.updateCounter++;
                console.log(MandelbrotSet.updateCounter);
            }
        },500);
    }

    update() {
        // calculate each pixel to see if that pixel is in the mandelbrot set. 
        // then draw the pixel if it is. 
        for (let i = 0; i < canvas.width; i++) {
            for (let j = 0; j < canvas.height; j++) {
                const coords = this.coords.canvasToCustom(i,j);
                if (this.calculateMandelbrot(math.complex(coords.x, coords.y), MandelbrotSet.updateCounter)) {
                    ctx.fillRect(i,j,1,1);
                }
            }
        }
    }

    calculateMandelbrot(c : math.Complex, iterations: number) {
        let z = math.complex(0,0);
        // iterations of z=z^2+c
        for (let i = 0; i < iterations; i++) {
            z = (math.add(math.multiply(z,z),c) as math.Complex);
            if (z.re > 2 || z.im > 2) {
                return false;
            }
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