import { FullWindowSize } from "./types";

export const canvas = document.querySelector<HTMLCanvasElement>('canvas')!;
export const ctx = canvas.getContext('2d')!;

// initial canvas setup

// initial fullscreen
canvas.width = FullWindowSize.width;
canvas.height = FullWindowSize.height;