import { Mole } from './scripts/mole.js';
import { spritesheetLocation } from './scripts/assets.js';
import * as PIXI from './scripts/pixi.js';

let sheet, loader, centerPoint;

function createMole() {
	let mole1 = new Mole(sheet);
	mole1.position.set(-200, 0);
	centerPoint.addChild(mole1);

	let mole2 = new Mole(sheet);
	mole2.position.set(200, 0);
	centerPoint.addChild(mole2);
}

function onAppProgress(e) {
	// TODO
	console.log('loading:', e.progress);
}

function onAppError(e) {
	// TODO
	console.log('error:', e.message);
}

function onAppLoaded(e) {
	sheet = loader.resources[spritesheetLocation];
	createMole();
	onResize();
}

function initApp() {
	window.addEventListener('resize', onResize);
	let app = new PIXI.Application({ resolution: 1, roundPixels: true, backgroundColor: 0xffffff });
	// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
	const cont = document.querySelector('.game-container');
	cont.appendChild(app.view);
	return app;
}

function addContainers() {
	centerPoint = new PIXI.Container();
	app.stage.addChild(centerPoint);
}

let app = initApp();
addContainers();
preload(); // assets are added and displayed in onComplete()

function preload() {
	loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
	loader.add(spritesheetLocation);
	loader.onProgress.add(onAppProgress);
	loader.onError.add(onAppError);
	loader.onComplete.add(onAppLoaded);
	loader.load();
}

function onResize() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	const halfW = Math.ceil(w / 2);
	const halfH = Math.ceil(h / 2);
	if (app) {
		app.renderer.resize(w, h);
	}

	if (centerPoint) {
		centerPoint.position.set(halfW, halfH);
	}

	// hacky way using constant from assets.js to keep anagram scaled to fit on screen
	// const scale = Math.min(1, w / minStageWidth);
	// centerPoint.scale.set(scale, scale);
}
