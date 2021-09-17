// coordinate data is translated in this source code
// mathematical coordinates will be evaluated as follows:

import { canvas } from "./domElements";
import { FullWindowSize } from "./types";

// current canvas dimensions are based on window width and height (let us assume it is 800x600)
// the pixel coordinates start at top left at 0,0. Bottom right is 800x600 in this example. 

// we want to change so top left is -maxValX/2, maxValY/2 and botton right is maxValX/2, -maxValY/2. 

export class CustomCoords2D {

	constructor(
		private maxValX: number,	// Max coordinate value to plug in. If origin is at left then the right would have an X value of maxValX. 
		private maxValY: number,	// Same as maxValX but for Y axis. If origin is at top then botton would have a Y value of maxValY. 

		// the zoom is calculated as follows:
		// 1 - 1:1 ratio of unit to pixel on canvas. This is when maxValX = canvas.width or maxValY = canvas.height
		// 0.5 - 1:2 ratio of pixels per unit. maxValX = canvas.width*2. Zoomed out. 
		// 2 - 2:1 ratio of pixels per unit. maxValX = canvas.width/2 or canvas.width*0.5. Zoomed in. 

		private originX: number,	// if 0, it is left of screen. If it is maxValX then it is right of screen. 
		private originY: number,	// if 0, it is bottom of screen. If maxValY then it is top of screen. (if Y axis is the typical - below axis, + above axis)

		private invertX = false,
		private invertY = true,			// this will be the conventional y negative below axis, y positive above axis. 
	) {}

	translateCanvasToCustom(x:number,y:number) {
		const newX = (
			(
				(this.invertX && (x-this.originX != 0)? -1 : 1) * (x - this.originX)
			)/FullWindowSize.getWidth()
		)*this.maxValX;
		const newY = (
			(
				(this.invertY && (y-this.originY != 0) ? -1 : 1) * (y - this.originY)
			)/FullWindowSize.getHeight()
		)*this.maxValY;

		return {x:newX, y:newY};
	}
}