import { Mole } from './mole.js';
import * as PIXI from './pixi.js';
import * as data from './data.js';

export class Game {
	app = null;
	sheet = null;
	loader = null;
	centerPoint = new PIXI.Container();
	showTimer = null;
	hideTimer = null;
	moles = [];

	constructor() {
		console.log('herp a derp');
		this.app = this.initApp();
		this.app.stage.addChild(this.centerPoint);
		this.loader = this.preload(); // assets are added and displayed in onComplete()
	}

	createMoles() {
		const moleRows = data.molesPerRow;
		const numRows = moleRows.length;
		for (let i = 0; i < numRows; i++) {
			const numMolesInRow = moleRows[i];
			const y = data.verticalSpacing * (i + 0.5 * (1 - numRows));
			for (let j = 0; j < numMolesInRow; j++) {
				const x = data.horizontalSpacing * (j + 0.5 * (1 - numMolesInRow));
				const mole = new Mole(this.sheet);
				mole.position.set(x, y);

				this.centerPoint.addChild(mole);
				this.moles.push(mole);
			}
		}
	}

	showMoles() {
		clearTimeout(this.showTimer);
		for (let i = 0; i < this.moles.length; i++) {
			this.moles[i].show();
		}
		this.hideTimer = setTimeout(() => {
			this.hideMoles();
		}, 1500);
	}

	hideMoles() {
		clearTimeout(this.hideTimer);
		for (let i = 0; i < this.moles.length; i++) {
			this.moles[i].hide();
		}
		this.showTimer = setTimeout(() => {
			this.showMoles();
		}, 2000);
	}

	onAppProgress(e) {
		// TODO
		console.log('loading:', e.progress);
	}

	onAppError(e) {
		// TODO
		console.log('error:', e.message);
	}

	onAppLoaded(e) {
		this.sheet = this.loader.resources[data.spritesheetLocation];
		this.createMoles();
		this.showTimer = setTimeout(() => {
			this.showMoles();
		}, 2000);
		this.onResize();
	}

	initApp() {
		window.addEventListener('resize', this.onResize);
		let app = new PIXI.Application({ resolution: 1, roundPixels: true, backgroundColor: 0xffffff });
		// PIXI.settings.SCALE_MODE = PIXI.SCALE_MODES.LINEAR;
		const cont = document.querySelector('.game-container');
		cont.appendChild(app.view);
		return app;
	}

	preload() {
		const loader = PIXI.Loader.shared; // PixiJS exposes a premade instance for you to use.
		loader.add(data.spritesheetLocation);
		loader.onProgress.add((e) => {
			this.onAppProgress(e);
		});
		loader.onError.add((e) => {
			this.onAppError(e);
		});
		loader.onComplete.add((e) => {
			this.onAppLoaded(e);
		});
		loader.load();
		return loader;
	}

	onResize() {
		const w = window.innerWidth;
		const h = window.innerHeight;
		const halfW = Math.ceil(w / 2);
		const halfH = Math.ceil(h / 2);
		if (this.app) {
			this.app.renderer.resize(w, h);
		}

		if (this.centerPoint) {
			this.centerPoint.position.set(halfW, halfH);

			const gameW = this.centerPoint.width + 2 * data.minGameMargin;
			const gameH = this.centerPoint.height + 2 * data.minGameMargin;
			const scale = Math.min(w / gameW, h / gameH);
			this.centerPoint.scale.set(scale, scale);
		}
	}
}
