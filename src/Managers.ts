import { Grid2D } from './Grids';
import { settings } from './settings';
import { Dimensions } from './types';

export class FractalManager {
    private canvasManager!: CanvasManager;

    update() {
        if (settings.dimension == Dimensions.One) {
            this.canvasManager = new CanvasManager1D();
            this.canvasManager.update();
        } else if (settings.dimension == Dimensions.Two) {
            this.canvasManager = new CanvasManager2D();
            this.canvasManager.update();
        }
    }
}

interface CanvasManager {
    update():void;
}

export class CanvasManager1D implements CanvasManager {
    update() {
    }
}

export class CanvasManager2D implements CanvasManager {
    update() {
        const grid = new Grid2D();
        grid.update();
    }
}