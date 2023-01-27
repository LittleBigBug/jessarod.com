/**
 * This file `lib/2d/paint.js` is licensed under CC BY-SA 3.0
 * https://creativecommons.org/licenses/by-sa/3.0/
 * Based on code from user BUN (openprocessing) and is heavily modified
 * https://openprocessing.org/user/187469
 * https://sourceof0.github.io/dmrb/
 */

import { Color } from "three";
import { Application, LINE_CAP } from "pixi.js";
import { SmoothGraphics as Graphics, settings, LINE_SCALE_MODE } from "@pixi/graphics-smooth";

const mouse = { x: 0, y: 0, down: false, over: false, };

let app, graphics;

/**
 * @typedef LineDrawData
 */
const LineDrawData = {
    first: true,
    r: 0, oldR: 0,
    x: 0, y: 0,
    ax: 0, ay: 0, a: 0.5,
    oldX: 0, oldY: 0
};

/**
 * @type LineDrawData
 */
let mainLineData = { ...LineDrawData };

let drawLines = [];

const conf = {
    diff: 3.125,
    distance: 10,
    spring: 0.5,
    friction: 0.5,
    brushSize: 30,
    split: 100,
    resolution: 2,
    lineLifetime: 1,
    lineSolidTime: 0.8,
    color: 0x95a0a2,
    darkColor: 0x546a6e,
    alpha: 0.8,
};

conf.diff = conf.brushSize / 8;

if (import.meta.hot) {
    import.meta.hot.accept();
    import.meta.hot.dispose(location.reload.bind(location));
}

export const mouseMove = (e) => {
    const rect = e.target.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
    mouse.over = true;
};

export const mouseLeave = () => {
    mouse.down = false;
    mouse.over = false;
};

export const mouseUp = () => (mouse.down = false);
export const mouseDown = () => (mouse.down = true);

export const startPaint = (div) => {
    if (app) return;

    app = new Application({
        resizeTo: div,
        antialias: false,
        autoStart: true,
        autoDensity: true,
    });
    div.appendChild(app.view);

    mainLineData = { ...LineDrawData };

    app.ticker.add(draw);
    app.ticker.maxFPS = 60;
    app.ticker.minFPS = 20;

    graphics = new Graphics();
    graphics.position.set(0, 0);

    app.stage.addChild(graphics);
};

const handlePaint = () => {
    const now = Date.now();
    const lifetime = conf.lineLifetime * 1000;
    const solidTime = conf.lineSolidTime * 1000;
    const fadeTime = lifetime - solidTime;

    drawLines = drawLines.filter(({ lines, time }) => {
        const diff = (fadeTime - Math.max(now - time - solidTime, 0)) / fadeTime;

        lines.forEach(({ x, y, x1, y1, weight, color }) =>
            graphics.lineStyle({
                color,
                width: weight,
                alpha: diff * conf.alpha,
                cap: LINE_CAP.ROUND,
            })
                .moveTo(x, y)
                .lineTo(x1, y1)
        );

        return (now - time) < lifetime;
    });
};

const colCache = new Map();

const col = (weight) => {
    if (colCache.has(weight)) return colCache.get(weight);
    const weightDiff = weight / conf.brushSize;
    const color = new Color(conf.color);
    color.lerp(new Color(conf.darkColor), weightDiff);
    const hex = color.getHex();
    colCache.set(weight, hex);
    return hex;
};

const newLine = (weight, x, y, x1, y1) => ({
    weight,
    x, y, x1, y1,
    color: col(weight),
});

/**
 * @param {LineDrawData} ld
 */
const calcLines = (ld) => {
    const lines = [];

    ld.ax += (mouse.x - ld.x) * conf.spring;
    ld.ay += (mouse.y - ld.y) * conf.spring;
    ld.ax *= conf.friction;
    ld.ay *= conf.friction;

    ld.a += Math.sqrt(ld.ax * ld.ax + ld.ay * ld.ay) - ld.a;
    ld.a *= 0.6;

    ld.r = conf.brushSize - ld.a;

    for (let i = 0; i < conf.distance; ++i) {
        ld.oldX = ld.x;
        ld.oldY = ld.y;

        ld.x += ld.ax / conf.distance;
        ld.y += ld.ay / conf.distance;

        ld.oldR += (ld.r - ld.oldR) / conf.distance;
        if (ld.oldR < 1) ld.oldR = 1;

        lines.push({
            time: Date.now(),
            lines: [
                newLine(ld.oldR + conf.diff, ld.x, ld.y, ld.oldX, ld.oldY),
                newLine(ld.oldR, ld.x + conf.diff * 2, ld.y + conf.diff * 2, ld.oldX + conf.diff * 2, ld.oldY + conf.diff * 2),
                newLine(ld.oldR, ld.x - conf.diff, ld.y - conf.diff, ld.oldX - conf.diff, ld.oldY - conf.diff),
            ],
        });
    }

    return lines;
};

const draw = () => {
    if (!app) return;

    graphics.clear();

    handlePaint();

    settings.LINE_SCALE_MODE = LINE_SCALE_MODE.NONE;

    if (!mouse.over || mouse.down) {
        if (!mainLineData.first)
            mainLineData = {
                ...mainLineData,
                first: true,
                ax: 0, ay: 0,
            };

        return;
    }

    mainLineData.oldR = mainLineData.r;

    if (mainLineData.first)
        mainLineData = {
            ...mainLineData,
            first: false,
            x: mouse.x,
            y: mouse.y,
        };

    drawLines.push(...calcLines(mainLineData));
}
