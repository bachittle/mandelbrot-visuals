import { ctx } from './canvasElements';
import { FullWindowSize } from './types';

export class Grid2D {
    padding = 40;
    boxWidth: number;
    boxHeight: number;

    constructor() {
        this.boxWidth = Math.ceil(FullWindowSize.width() / this.padding);
        this.boxHeight = Math.ceil(FullWindowSize.height() / this.padding);
    }

    // -- main functions --

    // called in the event loop
    update() {
        this.draw();    
    }

    private draw() {
        this.drawGridLines();
        this.drawAxis();
    }

    // -- helper functions --

    // drawGridLines: grid that covers entire screen, of squares. Like grid paper. 
    private drawGridLines() {
        // grid lines go like this for each iteration:
        //   |
        // - -
        //
        // each backwards L makes the grid shape
        //
        for (let i = 0; i < this.boxWidth; i++) {
            for (let j = 0; j < this.boxHeight; j++) {
                ctx.beginPath();
                ctx.moveTo(i*this.padding, j*this.padding+this.padding);
                ctx.lineTo(i*this.padding + this.padding, j*this.padding + this.padding)
                ctx.lineTo(i*this.padding + this.padding, j*this.padding);
                ctx.lineWidth = 1;
                ctx.stroke();
            }
        }
    }

    // drawAxis: axis is in the middle of the grid. 
    //      the middle of the grid should be calclulated using FullWindowSize vector

    private drawAxis() {
        const width = this.boxWidth * this.padding;
        const height = this.boxHeight * this.padding;

        // x axis
        ctx.beginPath();
        ctx.moveTo(0, height/2 + this.padding/2);
        ctx.lineTo(width, height/2 + this.padding/2);
        ctx.lineWidth = 3;
        ctx.stroke();

        // y axis
        ctx.beginPath();
        ctx.moveTo(width/2 + this.padding/2, 0);
        ctx.lineTo(width/2 + this.padding/2, height);
        ctx.stroke();
    }

}