// coordinate data is translated in this source code
// mathematical coordinates will be evaluated as follows:

// current canvas dimensions are based on window width and height (let us assume it is 800x600)
// the pixel coordinates start at top left at 0,0. Bottom right is 800x600 in this example. 

// we want to change so top left is -maxValX/2, maxValY/2 and botton right is maxValX/2, -maxValY/2. 

export class CustomCoords2D {

	constructor(
		// originX and originY are specified using CANVAS SCALE. 
		private originX: number,	// if 0, it is left of screen. If it is canvas.width it is the right of screen
		private originY: number,	// if 0, it is top of screen. If it is canvas.height it is bottom of screen. 

		private scale = 1,		// this scale is in terms of pixels per unit. So if scale is 100, then for every 100 pixels there is 1 unit. 

		private invertX = false,
		private invertY = true,			// this will be the conventional y negative below axis, y positive above axis. 
	) {}


	canvasToCustom(x:number,y:number) {
		return {x: this.canvasToCustomX(x), y: this.canvasToCustomY(y)};
	}

	canvasToCustomX(x:number) {
		return ((x-this.originX)/this.scale) * (this.invertX ? -1 : 1);
	}

	canvasToCustomY(y:number) {
		return ((y-this.originY)/this.scale) * (this.invertY ? -1 : 1); 
	}

	customToCanvas(x:number,y:number) {
		return {x: this.customToCanvasX(x), y: this.customToCanvasY(y)};
	}


	customToCanvasX(x:number) {
		return (x*this.scale*(this.invertX ? -1 : 1))+this.originX;
	}
	customToCanvasY(y:number) {
		return (y*this.scale*(this.invertY ? -1 : 1))+this.originY;
	}
}