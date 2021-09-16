import { Dimensions } from './types';
import * as dat from 'dat.gui';

export const settings = {
    debug: true,
    dimension: Dimensions.Two,
    iterations: {
        visible: true
    },
    fractal: null,
    grid: {
        mainAxisLineWidth: 2,
        gridLineWidth: 0.3,
    }
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

    datgui.add(settings.grid, 'gridLineWidth', 0.1, 0.7)
    datgui.add(settings.grid, 'mainAxisLineWidth', 0.2, 4)
}
