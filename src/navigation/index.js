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
		// window.addEventListener('resize', this.onResize); // TODO - this no worky
		this.onResize();
	}

	navigateTo(screen) {
		if (Object.getPrototypeOf(Object.getPrototypeOf(screen)).constructor.name !== 'BasicScreen') {
			throw 'navigateTo() parameter must be a subclass of BasicScreen';
		}

		if (screen == this.#currentScreen) return;
		if (this.#isNavigating) return;
		this.#isNavigating = true;
		this.#nextScreen = screen;
		if (this.#currentScreen) {
			this.#currentScreen.hide(this.onHideComplete.bind(this));
		} else {
			this.showNextScreen();
		}
	}

	onHideComplete() {
		this.#appView.removeChild(this.#currentScreen.view);
		this.#currentScreen = null; // TODO: will the screen be garbage collected?
		this.showNextScreen();
	}

	showNextScreen() {
		this.#currentScreen = this.#nextScreen;
		this.#nextScreen = null;
		this.#appView.addChild(this.#currentScreen.view);
		this.#currentScreen.show(this.onShowComplete.bind(this));
		this.#isNavigating = false;
	}

	onShowComplete() {
		this.#isNavigating = false;
	}

	onResize() {
		const halfW = Math.ceil(window.innerWidth / 2);
		const halfH = Math.ceil(window.innerHeight / 2);

		if (this.#appView) {
			this.#appView.position.set(halfW, halfH);
		}
	}
}
