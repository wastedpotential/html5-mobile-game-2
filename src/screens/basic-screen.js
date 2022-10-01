// interface for screens
import * as PIXI from '../scripts/pixi.js';

export class BasicScreen {
	renderer = new PIXI.Container(); // public for subclass access

	// ============== PUBLIC METHODS ==============
	constructor() {
		console.log('constructor');
	}

	show(onShow) {
		console.log('show', onShow);
		() => {
			onShow();
		};
	}

	hide(onHide) {
		console.log('hide');
		() => {
			onHide();
		};
	}
}
