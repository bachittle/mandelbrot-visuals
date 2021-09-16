import { canvas } from './canvasElements';

import { FullWindowSize, Manager } from './types';
import { mouse } from './settings';

// generates all the event listeners via functions on a dom element. 
// mainly does the following:
// - canvas is reset to fullscreen on each canvas resize
// - mouse movement is captured and potentially used to move canvas (or dom) objects. 

export function generateEventListeners(manager:Manager) {
    window.addEventListener('resize', () => {
        canvas.width = FullWindowSize.getWidth();
        canvas.height = FullWindowSize.getHeight();

        manager.reset();
    });

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    window.addEventListener('click', (event) => {
        console.log(event);
    });
}