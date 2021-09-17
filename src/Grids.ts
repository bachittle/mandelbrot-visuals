import { ctx, canvas } from './domElements';
import { FullWindowSize } from './types';
import { settings } from './settings';
import { CustomCoords2D } from './Coords';

export class Grid2D {
    padding: number;

    numBoxesX: number;  // number of boxes on the X axis
    numBoxesY: number;  // number of boxes on the Y axis

    middleX: number;
    middleY: number;

    offsetX: number;
    offsetY: number;

    coords: CustomCoords2D;

    constructor() {
        this.padding = settings.grid.padding;

        this.numBoxesX = Math.ceil(FullWindowSize.getWidth() / this.padding);
        this.numBoxesY = Math.ceil(FullWindowSize.getHeight() / this.padding);

        // middleX and middleY of the grid. It is not precisely in the middle of the canvas, but instead in the middle of the grid. 
        // if number of boxes on either X or Y is odd, it will adjust itself accordingly. 
        this.middleX = (this.numBoxesX - (this.numBoxesX%2==0?0:1)) * this.padding / 2;
        this.middleY = (this.numBoxesY - (this.numBoxesY%2==0?0:1)) * this.padding / 2;

        // aligns the boxes with the center axis. First box may be cut off to only have 2-3 rather than 4 sub-boxes, 
        // but middle will always be the same spot. 
        this.offsetX = (4-((this.middleX/this.padding)%4)) * this.padding;
        this.offsetY = (4-((this.middleY/this.padding)%4)) * this.padding;

        this.coords = new CustomCoords2D(canvas.width/2, canvas.height/2, settings.grid.scale);
    }

    // -- main functions --

    // called in the event loop
    update() {
        this.draw();    
    }

    private draw() {
        this.drawAxis();
        this.drawGridLines();
        this.drawNumbers();
    }

    // -- helper functions --

    // drawAxis: axis is in the middle of the grid. 
    //      the middle of the grid should be calclulated using FullWindowSize vector

    private drawAxis() {
        const origin = this.coords.customToCanvas(0,0);

        if (origin.x > 0 && origin.x < FullWindowSize.getWidth() && origin.y > 0 && origin.y < FullWindowSize.getHeight()) {
            // x axis
            ctx.beginPath();
            ctx.moveTo(0, origin.y);
            ctx.lineTo(FullWindowSize.getWidth(), origin.y);
            ctx.lineWidth = settings.grid.mainAxisLineWidth;
            ctx.stroke();

            // y axis
            ctx.beginPath();
            ctx.moveTo(origin.x, 0);
            ctx.lineTo(origin.x, FullWindowSize.getHeight());
            ctx.stroke();
        }
    }

    // drawGridLines: grid that covers entire screen, of squares. Like grid paper. 
    private drawGridLines() {
        // grid lines go like this for each iteration:
        //   |
        // - -
        //
        // each backwards L makes the grid shape

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.beginPath();
                console.log(this.coords.customToCanvasX(i), this.coords.customToCanvasY(j));
                ctx.moveTo(this.coords.customToCanvasX(i), this.coords.customToCanvasY(j));
                ctx.lineTo(this.coords.customToCanvasX(i+1), this.coords.customToCanvasY(j));
                ctx.lineTo(this.coords.customToCanvasX(i+1), this.coords.customToCanvasY(j+1));
                ctx.stroke();
            }
        }
        
    }


    private drawNumbers() {
        // this is based on the zoom parameter. A higer zoom will show smaller numbers in the grid (ex: count from 0.2, 0.4, ..., 1)
        // and a lower zoom will show larger numbers (ex: count from 100, 200, ..., 1000)
        // the default zoom (x1) will count each dark box as a unit of 1, and light box as a unit of 1/4.  

        // zero at bottom right of center
        ctx.font = settings.grid.fontStyle;
        // horizontal numbers

        // vertical numbers
    }
}