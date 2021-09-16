import { Dimensions } from './types';
import * as dat from 'dat.gui';
import { FractalManager } from './Managers';

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
    fractal: null,
    grid: {
        padding: 41,
        mainAxisLineWidth: 2,
        gridLineWidth: 0.3,
        darkGridLineWidth: 0.6,
        fontStyle: '18px Arial',
    },
    zoom: 1,
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

    datgui.add(settings.grid, 'padding', 1, 100).onChange(()=>{
        settings.manager?.reset();
    });
    datgui.add(settings.grid, 'gridLineWidth', 0.1, 0.7)
    datgui.add(settings.grid, 'darkGridLineWidth', 0.1, 0.7)
    datgui.add(settings.grid, 'mainAxisLineWidth', 0.2, 4)
}
