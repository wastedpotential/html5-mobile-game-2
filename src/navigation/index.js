import * as PIXI from '../scripts/pixi.js';

export class Navigator {
	#app;
	#currentScreen;
	#nextScreen;
	#isNavigating = false;
	#appView = new PIXI.Container();

	constructor(app) {
		this.#app = app;
		this.#app.stage.addChild(this.#appView);
		window.addEventListener('resize', this.#onResize.bind(this)); // TODO - refactor to not use window listener?
		this.#onResize();
	}

	navigateTo(screen) {
		// console.log('~~', Object.getPrototypeOf(Object.getPrototypeOf(screen)).constructor.name);
		// if (Object.getPrototypeOf(Object.getPrototypeOf(screen)).constructor.name !== 'BasicScreen') {
		// 	throw 'navigateTo() parameter must be a subclass of BasicScreen';
		// }

		if (screen == this.#currentScreen) return;
		if (this.#isNavigating) return;
		this.#nextScreen = screen;
		this.#hideScreen();
	}

	#hideScreen() {
		this.#isNavigating = true;
		if (this.#currentScreen) {
			this.#currentScreen.hide(this.#onHideComplete.bind(this));
		} else {
			this.#showNextScreen();
		}
	}

	#onHideComplete() {
		this.#appView.removeChild(this.#currentScreen.view);
		this.#currentScreen = null; // TODO: will the screen be garbage collected?
		this.#showNextScreen();
	}

	#showNextScreen() {
		this.#currentScreen = this.#nextScreen;
		this.#nextScreen = null;
		this.#appView.addChild(this.#currentScreen.view);
		this.#currentScreen.show(this.#onShowComplete.bind(this));
		this.#isNavigating = false;
	}

	#onShowComplete() {
		this.#isNavigating = false;
	}

	#onResize() {
		const halfW = Math.ceil(window.innerWidth / 2);
		const halfH = Math.ceil(window.innerHeight / 2);
		console.log(this.#appView);
		if (this.#appView) {
			this.#appView.position.set(halfW, halfH);
		}
	}
}
