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
    grid: Grid2D;

    constructor() {
        this.grid = new Grid2D();
    }
    update() {
        this.grid.update();
    }
}