import { canvas, ctx } from './domElements';
import { settings } from './settings';
import { CustomCoords2D } from './Coords';

export class Grid2D {
    constructor(
        private coords: CustomCoords2D
    ) {}

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

    private drawAxis() {
        const origin = this.coords.customToCanvas(0,0);

        if (origin.x > 0 && origin.x < canvas.width && origin.y > 0 && origin.y < canvas.height) {
            // x axis
            ctx.beginPath();
            ctx.moveTo(0, origin.y);
            ctx.lineTo(canvas.width, origin.y);
            ctx.lineWidth = settings.grid.mainAxisLineWidth;
            ctx.stroke();

            // y axis
            ctx.beginPath();
            ctx.moveTo(origin.x, 0);
            ctx.lineTo(origin.x, canvas.height);
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

        for (let i = -7; i < 7; i++) {
            for (let j = -5; j < 5; j++) {
                ctx.beginPath();
                ctx.moveTo(this.coords.customToCanvasX(i), this.coords.customToCanvasY(j));
                ctx.lineTo(this.coords.customToCanvasX(i+1), this.coords.customToCanvasY(j));
                ctx.lineTo(this.coords.customToCanvasX(i+1), this.coords.customToCanvasY(j+1));
                ctx.lineWidth = settings.grid.gridLineWidth;
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
        for (let i = -6; i <= 6; i++) {
            ctx.fillText(
                `${i}`, 
                this.coords.customToCanvasX(i)-5+(i==0?-10:0), 
                this.coords.customToCanvasY(0)+20
            );
        }

        // vertical numbers
        for (let i = -4; i <= 4; i++) {
            ctx.fillText(`${i}`, this.coords.customToCanvasX(0)+5, this.coords.customToCanvasY(i));
        }
    }
}