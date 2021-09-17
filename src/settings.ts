import { Dimensions } from './types';
import * as dat from 'dat.gui';
import { FractalManager } from './Managers';
import { canvas } from './domElements';

interface hasManager {
    [key: string]: any; 
    manager: FractalManager | null;
}

export const settings : hasManager = {
    debug: true,
    manager: null,
    dimension: Dimensions.Two,
    iterations: {
        visible: true
    },
    fractal: {
        quality: 15,     // the lower the number the better, lowest is 1 (1 pixel)
    },
    grid: {
        originX: canvas.width/2,
        originY: canvas.height/2,
        scale: 100,
        mainAxisLineWidth: 2,
        gridLineWidth: 0.3,
        darkGridLineWidth: 0.6,
        fontStyle: '18px Arial',
    },

    // may speed up code, must call update functions manually on item changes. 
    useAnimationLoop: false,
}

export const mouse = {
    x: 0,
    y: 0,
    isClicked: false,
}

if (settings.debug) {
    const datgui = new dat.GUI();
    datgui.add(settings, 'dimension', 1, 2).onChange(() => {
        // dimension should be integer, so round. 
        settings.dimension = Math.round(settings.dimension);
    });

    datgui.add(settings.grid, 'scale', 1, 100000).onChange(()=>{
        settings.manager?.reset();
    });
    datgui.add(settings.grid, 'gridLineWidth', 0.1, 0.7)
    datgui.add(settings.grid, 'darkGridLineWidth', 0.1, 0.7)
    datgui.add(settings.grid, 'mainAxisLineWidth', 0.2, 4)

    datgui.add(settings.fractal, 'quality', 1, 20)
}
