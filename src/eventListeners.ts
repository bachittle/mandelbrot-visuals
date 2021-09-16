import { canvas } from './domElements';

import { FullWindowSize } from './types';
import { mouse, settings } from './settings';

// generates all the event listeners via functions on a dom element. 
// mainly does the following:
// - canvas is reset to fullscreen on each canvas resize
// - mouse movement is captured and potentially used to move canvas (or dom) objects. 

export function generateEventListeners() {
    window.addEventListener('resize', () => {
        canvas.width = FullWindowSize.getWidth();
        canvas.height = FullWindowSize.getHeight();

        settings.manager?.reset();
    });

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('mousedown', () => {
        mouse.isClicked = true;
    });
    window.addEventListener('mouseup', () => {
        mouse.isClicked = false;
    });

    window.addEventListener('wheel', (event) => {
        settings.grid.padding -= event.deltaY/100;
        settings.manager?.reset();
    });
}