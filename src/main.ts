import './style.css'
import { FractalManager } from './Managers';
import { ctx, canvas } from './domElements';
import { generateEventListeners } from './eventListeners';
import { CustomCoords2D } from './Coords';

const manager = new FractalManager();

generateEventListeners();

const coords = new CustomCoords2D(10,10,canvas.width/2,canvas.height/2);
const res = coords.translateCanvasToCustom(canvas.width / 2, canvas.height / 2);
console.log(res);

function animateLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  manager.update();

  requestAnimationFrame(animateLoop);
}

animateLoop();

/*
const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
*/