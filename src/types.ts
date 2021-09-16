export enum Dimensions {
    One,
    Two
}

export enum Fractals {
    Julia,
    Mandelbrot
}

export class FullWindowSize {
    static readonly width : number = window.innerWidth;
    static readonly height : number = window.innerHeight;
}