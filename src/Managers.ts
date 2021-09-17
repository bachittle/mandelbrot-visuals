import { CustomCoords2D } from './Coords';
import { canvas, ctx } from './domElements';
import { MandelbrotSet } from './Fractals';
import { Grid2D } from './Grids';
import { settings} from './settings';
import { Dimensions, Manager } from './types';

export class FractalManager implements Manager {
    private canvasManager!: CanvasManager;

    private init() {
        settings.manager = this;
        if (settings.dimension == Dimensions.One) {
            this.canvasManager = new CanvasManager1D();
        } else if (settings.dimension == Dimensions.Two) {
            this.canvasManager = new CanvasManager2D();
        }

        if (!settings.useAnimationLoop) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            this.update()
        }
    }

    constructor() {
        this.init();
    }
    reset() {
        this.init();
    }

    update() {
        this.canvasManager.update();
    }
}

interface CanvasManager {
    update():void;
}

export class CanvasManager1D implements CanvasManager {
    update() {}
}

export class CanvasManager2D implements CanvasManager {
    private coords: CustomCoords2D;
    private grid: Grid2D;
    private mandelbrot: MandelbrotSet;

    constructor() {
        this.coords = new CustomCoords2D(canvas.width/2, canvas.height/2, settings.grid.scale);
        this.mandelbrot = new MandelbrotSet(this.coords);
        this.grid = new Grid2D(this.coords);
    }
    update() {
        this.grid.update();
        this.mandelbrot.update();
    }

    async mandelbrotJob() {

    }
}