import { Mole } from './scripts/mole.js';
import * as PIXI from './scripts/pixi.js';
import * as data from './scripts/data.js';

let sheet, loader, centerPoint, showTimer, hideTimer;
const moles = [];

function createMoles() {
	const moleRows = data.molesPerRow;
	const numRows = moleRows.length;
	for (let i = 0; i < numRows; i++) {
		const numMolesInRow = moleRows[i];
		const y = data.verticalSpacing * (i + 0.5 * (1 - numRows));
		for (let j = 0; j < numMolesInRow; j++) {
			const x = data.horizontalSpacing * (j + 0.5 * (1 - numMolesInRow));
			const mole = new Mole(sheet);
			mole.position.set(x, y);
			centerPoint.addChild(mole);
			moles.push(mole);
		}
	}
}

function showMoles() {
	clearTimeout(showTimer);
	for (let i = 0; i < moles.length; i++) {
		moles[i].show();
	}
	hideTimer = setTimeout(() => {
		hideMoles();
	}, 1500);
}

function hideMoles() {
	clearTimeout(hideTimer);
	for (let i = 0; i < moles.length; i++) {
		moles[i].hide();
	}
	showTimer = setTimeout(() => {
		showMoles();
	}, 2000);
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
	sheet = loader.resources[data.spritesheetLocation];
	createMoles();
	showTimer = setTimeout(() => {
		showMoles();
	}, 2000);
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
	loader.add(data.spritesheetLocation);
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

		const gameW = centerPoint.width + 2 * data.minGameMargin;
		const gameH = centerPoint.height + 2 * data.minGameMargin;
		const scale = Math.min(w / gameW, h / gameH);
		centerPoint.scale.set(scale, scale);
	}
}
