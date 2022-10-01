import * as PIXI from './scripts/pixi.js';
import { Game } from './scripts/game.js';
import { HomeScreen } from './screens/home-screen';
import { Navigator } from './navigation';
import { appState } from './scripts/state';
import * as data from './scripts/data.js';

//const game = new Game();

function initApp() {
	window.addEventListener('resize', onResize);
	let app = new PIXI.Application({ resolution: 1, roundPixels: true, backgroundColor: 0xffffff });
	// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
	const cont = document.querySelector('.game-container');
	cont.appendChild(app.view);
	return app;
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
	appState.spriteSheet = loader.resources[data.spritesheetLocation];
	const homeScreen = new HomeScreen();
	appState.navigator.navigateTo(homeScreen);
}

function preload() {
	loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
	loader.add(data.spritesheetLocation);
	loader.onProgress.add(onAppProgress);
	loader.onError.add(onAppError);
	loader.onComplete.add(onAppLoaded);
	loader.load();
}

function onResize() {
	const w = window.innerWidth;
	const h = window.innerHeight;
	// const halfW = Math.ceil(w / 2);
	// const halfH = Math.ceil(h / 2);
	if (app) {
		app.renderer.resize(w, h);
	}
}

const app = initApp();
let loader = null;
preload();
console.log('app:', app);
appState.navigator = new Navigator(app);
