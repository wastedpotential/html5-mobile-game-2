import { Mole } from './mole.js';
import * as PIXI from './pixi.js';
import * as data from './data.js';
import { appState } from './state';

export class Game {
	sheet = null;
	loader = null;
	centerPoint = new PIXI.Container();
	showTimer = null;
	hideTimer = null;
	moles = [];
	parentView = null;

	constructor(view) {
		console.log('game!');
		this.parentView = view;
		this.parentView.addChild(this.centerPoint);
		this.start();
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

	start() {
		this.sheet = appState.spriteSheet;
		this.createMoles();
		this.showTimer = setTimeout(() => {
			this.showMoles();
		}, 2000);
		this.onResize();
	}

	onResize() {
		const w = window.innerWidth;
		const h = window.innerHeight;

		if (this.centerPoint) {
			const gameW = this.centerPoint.width + 2 * data.minGameMargin;
			const gameH = this.centerPoint.height + 2 * data.minGameMargin;
			const scale = Math.min(w / gameW, h / gameH);
			this.centerPoint.scale.set(scale, scale);
		}
	}
}
