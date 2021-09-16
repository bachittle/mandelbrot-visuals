import { ctx } from './domElements';
import { FullWindowSize } from './types';
import { settings } from './settings';

export class Grid2D {
    padding: number;

    numBoxesX: number;  // number of boxes on the X axis
    numBoxesY: number;  // number of boxes on the Y axis

    middleX: number;
    middleY: number;

    constructor() {
        this.padding = settings.grid.padding;

        this.numBoxesX = Math.ceil(FullWindowSize.getWidth() / this.padding);
        this.numBoxesY = Math.ceil(FullWindowSize.getHeight() / this.padding);

        // middleX and middleY of the grid. It is not precisely in the middle of the canvas, but instead in the middle of the grid. 
        // if number of boxes on either X or Y is odd, it will adjust itself accordingly. 
        this.middleX = (this.numBoxesX - (this.numBoxesX%2==0?0:1)) * this.padding / 2;
        this.middleY = (this.numBoxesY - (this.numBoxesY%2==0?0:1)) * this.padding / 2;

        console.log(this.numBoxesX, this.numBoxesY);
    }

    // -- main functions --

    // called in the event loop
    update() {
        this.draw();    
    }

    private draw() {
        this.drawGridLines();
        this.drawAxis();
        this.drawNumbers();
    }

    // -- helper functions --

    // drawGridLines: grid that covers entire screen, of squares. Like grid paper. 
    private drawGridLines() {
        // grid lines go like this for each iteration:
        //   |
        // - -
        //
        // each backwards L makes the grid shape
        
        // light boxes
        for (let i = 0; i < this.numBoxesX; i++) {
            for (let j = 0; j < this.numBoxesY; j++) {
                // main grid. Secondary numbers, probably not shown until zoomed in. 
                ctx.beginPath();
                ctx.moveTo(i*this.padding, j*this.padding+this.padding);
                ctx.lineTo(i*this.padding + this.padding, j*this.padding + this.padding)
                ctx.lineTo(i*this.padding + this.padding, j*this.padding);
                ctx.lineWidth = settings.grid.gridLineWidth;
                ctx.stroke();
            }
        }

        // dark boxes
        console.log((this.middleX/this.padding)%4);

        // aligns the boxes with the center axis. First box may be cut off to only have 2-3 rather than 4 sub-boxes, 
        // but middle will always be the same spot. 
        const offsetX = (4-((this.middleX/this.padding)%4)) * this.padding;
        const offsetY = (4-((this.middleY/this.padding)%4)) * this.padding;
        for (let i = 0; i < this.numBoxesX/4+2; i++) {
            for (let j = 0; j < this.numBoxesY/4+2; j++) {
                ctx.beginPath();
                // grid for every 4 boxes, a bit darker. Outlines primary numbers. 
                const inc = this.padding * 4;
                ctx.moveTo(i*inc - offsetX, j*inc+inc - offsetY);
                ctx.lineTo(i*inc + inc - offsetX, j*inc + inc - offsetY)
                ctx.lineTo(i*inc + inc - offsetX, j*inc - offsetY);
                ctx.lineWidth = settings.grid.darkGridLineWidth;
                ctx.stroke();
            }
        }
    }

    // drawAxis: axis is in the middle of the grid. 
    //      the middle of the grid should be calclulated using FullWindowSize vector

    private drawAxis() {
        // x axis
        ctx.beginPath();
        ctx.moveTo(0, this.middleY);
        ctx.lineTo(FullWindowSize.getWidth(), this.middleY);
        ctx.lineWidth = settings.grid.mainAxisLineWidth;
        ctx.stroke();

        // y axis
        ctx.beginPath();
        ctx.moveTo(this.middleX, 0);
        ctx.lineTo(this.middleX, FullWindowSize.getHeight());
        ctx.stroke();
    }

    private drawNumbers() {
        // this is based on the zoom parameter. A higer zoom will show smaller numbers in the grid (ex: count from 0.2, 0.4, ..., 1)
        // and a lower zoom will show larger numbers (ex: count from 100, 200, ..., 1000)
        // the default zoom (x1) will count each dark box as a unit of 1, and light box as a unit of 1/4.  

        // zero at bottom right of center
        ctx.font = settings.grid.fontStyle;
        // horizontal numbers
        for (let i = 1; i < this.numBoxesX/4; i++) {
            const index = i-Math.floor(this.numBoxesX/8);
            ctx.fillText(`${index}`, i*this.padding*4 - this.padding/2, this.middleY + this.padding/2);
        }

        // vertical numbers
        for (let i = 1; i < this.numBoxesY/4; i++) {
            const index = i-Math.floor(this.numBoxesY/8);

            // skip when the index is zero. We write zero on the horizontal numbers. 
            if (index == 0) {
                continue;
            }
            ctx.fillText(`${index}`, this.middleX + this.padding/2, FullWindowSize.getHeight() - (i*this.padding*4 - this.padding/4));
        }
    }

}