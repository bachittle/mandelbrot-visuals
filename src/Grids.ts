import { ctx } from './canvasElements';
import { FullWindowSize } from './types';

export class Grid2D {
    padding = 40;
    boxWidth: number;
    boxHeight: number;

    constructor() {
        this.boxWidth = Math.ceil(FullWindowSize.getWidth() / this.padding);
        this.boxHeight = Math.ceil(FullWindowSize.getHeight() / this.padding);
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

        // middleX and middleY of the grid. It is not precisely in the middle of the canvas, but instead in the middle of the grid. 
        // if grid is odd, it will align itself to the closest line on the left. 
        const middleX = (this.boxWidth - (this.boxWidth%2==0?0:1)) * this.padding / 2;
        const middleY = (this.boxHeight - (this.boxHeight%2==0?0:1)) * this.padding / 2;

        console.log(this.boxWidth, this.boxHeight);

        // x axis
        ctx.beginPath();
        ctx.moveTo(0, middleY);
        ctx.lineTo(FullWindowSize.getWidth(), middleY);
        ctx.lineWidth = 3;
        ctx.stroke();

        // y axis
        ctx.beginPath();
        ctx.moveTo(middleX, 0);
        ctx.lineTo(middleX, FullWindowSize.getHeight());
        ctx.stroke();
    }

}