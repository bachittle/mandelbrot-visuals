export enum Dimensions {
    One,
    Two
}

export enum Fractals {
    Julia,
    Mandelbrot
}

export class FullWindowSize {
    static getWidth() { return window.innerWidth };
    static getHeight() { return window.innerHeight };
}

export interface Manager {
    update():void;
    reset():void;
}