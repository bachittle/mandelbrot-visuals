// coordinate data is translated in this source code
// mathematical coordinates will be evaluated as follows:

import { canvas } from "./domElements";
import { FullWindowSize } from "./types";

// current canvas dimensions are based on window width and height (let us assume it is 800x600)
// the pixel coordinates start at top left at 0,0. Bottom right is 800x600 in this example. 

// we want to change so top left is -maxValX/2, maxValY/2 and botton right is maxValX/2, -maxValY/2. 

export class CustomCoords2D {

	constructor(
		private maxValX: number,	// Max coordinate value to plug in. If origin is at top right then the top left would have an X value of maxValX. 
		private maxValY: number,	// Same as maxValX but for Y axis. 

		private originX: number,	// if 0, it is left of screen. If it is maxValX then it is right of screen. 
		private originY: number,	// if 0, it is bottom of screen. If maxValY then it is top of screen. (if Y axis is the typical - below axis, + above axis)

		private invertX = false,
		private invertY = true,			// this will be the conventional y negative below axis, y positive above axis. 
	) {}

	translateCanvasToCustom(x:number,y:number) {
		const newX = (
			(
				(this.invertX ? -1 : 1) * (x - this.originX)
			)/FullWindowSize.getWidth()
		)*this.maxValX;
		const newY = (
			(
				(this.invertY ? -1 : 1) * (y - this.originY)
			)/FullWindowSize.getHeight()
		)*this.maxValY;

		return {x:newX, y:newY};
	}
}