import { Grid2D } from './Grids';
import { settings } from './settings';
import { Dimensions, Manager } from './types';

export class FractalManager implements Manager {
    private canvasManager!: CanvasManager;

    private init() {
        if (settings.dimension == Dimensions.One) {
            this.canvasManager = new CanvasManager1D();
        } else if (settings.dimension == Dimensions.Two) {
            this.canvasManager = new CanvasManager2D();
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
    update() {
    }
}

export class CanvasManager2D implements CanvasManager {
    update() {
        const grid = new Grid2D();
        grid.update();
    }
}