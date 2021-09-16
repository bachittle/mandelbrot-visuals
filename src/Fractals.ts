interface Fractal {
    update():any;
    draw():any;
}

export class MandelbrotSet implements Fractal {
    update() {
        this.draw();
    }
    draw() {

    }

}

export class JuliaSet implements Fractal {
    update() {
        this.draw();
    }
    draw() {

    }
}