export enum Dimensions {
    One,
    Two
}

export enum Fractals {
    Julia,
    Mandelbrot
}

export class FullWindowSize {
    static width() { return window.innerWidth };
    static height() { return window.innerHeight };
}

export interface Manager {
    update():void;
    reset():void;
}