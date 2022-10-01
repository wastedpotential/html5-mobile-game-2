// interface for screens
import * as PIXI from '../scripts/pixi.js';

export class BasicScreen {
	view = new PIXI.Container(); // wrapper view public for subclass access

	constructor() {
		console.log('constructor');
	}

	show(onComplete) {
		console.log('show', onComplete);
		onComplete();
	}

	hide(onComplete) {
		console.log('hide');
		onComplete();
	}
}
