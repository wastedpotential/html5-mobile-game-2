import { Mole } from './mole.js';
import * as PIXI from '../../scripts/pixi.js';
import * as data from '../../scripts/data.js';
import { appState } from '../../scripts/state';

export class Game {
	molePressed = null;
	#centerPoint = new PIXI.Container();
	#showTimer = null;
	#hideTimer = null;
	#moles = [];

	constructor(view) {
		view.addChild(this.#centerPoint);
		this.#start();
	}

	#createMoles() {
		const moleRows = data.molesPerRow;
		const numRows = moleRows.length;
		for (let i = 0; i < numRows; i++) {
			const numMolesInRow = moleRows[i];
			const y = data.verticalSpacing * (i + 0.5 * (1 - numRows));
			for (let j = 0; j < numMolesInRow; j++) {
				const x = data.horizontalSpacing * (j + 0.5 * (1 - numMolesInRow));
				const mole = new Mole(appState.spriteSheet, this.#onMolePressDown, this.#onMolePressUp);
				mole.position.set(x, y);

				this.#centerPoint.addChild(mole);
				this.#moles.push(mole);
			}
		}
	}

	#showMoles() {
		const odds = Math.floor(100 * Math.random());
		let chosenMoles = this.#selectRandomMole([]); // add a single mole
		if (odds > 60) {
			chosenMoles = this.#selectRandomMole(chosenMoles); // add a second mole
		}
		if (odds > 80) {
			chosenMoles = this.#selectRandomMole(chosenMoles); // add a third mole
		}
		clearTimeout(this.#showTimer);
		for (let i = 0; i < chosenMoles.length; i++) {
			chosenMoles[i].show();
		}
		this.#hideTimer = setTimeout(() => {
			this.#hideMoles();
		}, 1500);
	}

	#hideMoles() {
		clearTimeout(this.#hideTimer);
		for (let i = 0; i < this.#moles.length; i++) {
			this.#moles[i].hide();
		}
		this.#showTimer = setTimeout(() => {
			this.#showMoles();
		}, 2000);
	}

	#onMolePressDown(mole) {
		if (this.molePressed) {
			return;
		}
		this.molePressed = mole;
		mole.hurtMole();
	}

	#onMolePressUp(mole) {
		if (mole === this.molePressed) {
			this.molePressed = null;
			mole.killMole();
		}
	}

	#selectRandomMole(alreadyChosenMoles) {
		let chosen = false;
		let chosenMoles = [...alreadyChosenMoles];
		while (!chosen) {
			const randomIndex = Math.floor(this.#moles.length * Math.random());
			//console.log(randomIndex);
			if (!chosenMoles.includes(this.#moles[randomIndex])) {
				chosenMoles.push(this.#moles[randomIndex]);
				chosen = true;
			}
		}
		return chosenMoles;
	}

	#start() {
		this.#createMoles();
		this.#showTimer = setTimeout(() => {
			this.#showMoles();
		}, 2000);
		window.addEventListener('resize', this.#onResize.bind(this));
		this.#onResize();
	}

	#onResize() {
		const w = window.innerWidth;
		const h = window.innerHeight;

		if (this.#centerPoint) {
			const gameW = this.#centerPoint.width + 2 * data.minGameMargin;
			const gameH = this.#centerPoint.height + 2 * data.minGameMargin;
			const scale = Math.min(w / gameW, h / gameH);
			this.#centerPoint.scale.set(scale, scale);
		}
	}
}
