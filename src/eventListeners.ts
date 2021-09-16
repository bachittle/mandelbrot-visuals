import { canvas, ctx } from './canvasElements';

import { FullWindowSize } from './types';
import { mouse } from './settings';

// generates all the event listeners via functions on a dom element. 
// mainly does the following:
// - canvas is reset to fullscreen on each canvas resize
// - mouse movement is captured and potentially used to move canvas (or dom) objects. 

export function generateEventListeners(domElement:any) {
    document.addEventListener('resize', () => {
        canvas.width = FullWindowSize.width;
        canvas.height = FullWindowSize.height;
    });

    document.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
    });

    document.addEventListener('click', (event) => {
        console.log(event);
    });
}