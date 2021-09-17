import './style.css'
import { FractalManager } from './Managers';
import { ctx, canvas } from './domElements';
import { generateEventListeners } from './eventListeners';
import { settings } from './settings';

const manager = new FractalManager();

generateEventListeners();

function animateLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  manager.update();

  if (settings.useAnimationLoop) {
    requestAnimationFrame(animateLoop);
  }
}

animateLoop();

/*
const app = document.querySelector<HTMLDivElement>('#app')!

app.innerHTML = `
  <h1>Hello Vite!</h1>
  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>
`
*/