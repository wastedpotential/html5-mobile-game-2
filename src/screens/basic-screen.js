// interface for screens
import * as PIXI from '../scripts/pixi.js';
import gsap from 'gsap';

export class BasicScreen {
	view = new PIXI.Container(); // wrapper view public for subclass access
	filter = new PIXI.filters.AlphaFilter(0);

	constructor() {
		console.log('constructor');
		this.view.filters = [this.filter];
	}

	show(onComplete) {
		console.log('show', onComplete);
		gsap.to(this.filter, {
			alpha: 1,
			delay: 0,
			duration: 0.2,
			onComplete: function () {
				onComplete();
			},
		});
	}

	hide(onComplete) {
		console.log('hide');
		gsap.to(this.filter, {
			alpha: 0,
			delay: 0,
			duration: 0.2,
			onComplete: function () {
				onComplete();
			},
		});
	}
}
