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
		window.addEventListener('resize', this.onResize);
		this.onResize();
	}

	navigateTo(screen) {
		console.log(screen, this.#currentScreen, this.#isNavigating);
		if (screen == this.#currentScreen) return;
		if (this.#isNavigating) return;
		this.#isNavigating = true;
		this.#nextScreen = screen;
		if (this.#currentScreen) {
			console.log('removing...');
			this.#currentScreen.hide(this.onHideComplete.bind(this));
		} else {
			this.showNextScreen();
		}
	}

	onHideComplete() {
		console.log('onhidecomplete');
		this.#appView.removeChild(this.#currentScreen.view);
		this.#currentScreen = null;
		this.showNextScreen();
	}

	showNextScreen() {
		console.log('show next...');
		this.#currentScreen = this.#nextScreen;
		this.#nextScreen = null;
		this.#appView.addChild(this.#currentScreen.view);
		this.#currentScreen.show(this.onShowComplete.bind(this));
		this.#isNavigating = false;
	}

	onShowComplete() {
		console.log('~~~~~');
		console.log('##', this, this.#isNavigating);
		this.#isNavigating = false;
	}

	onResize() {
		const w = window.innerWidth;
		const h = window.innerHeight;
		const halfW = Math.ceil(w / 2);
		const halfH = Math.ceil(h / 2);

		if (this.#appView) {
			this.#appView.position.set(halfW, halfH);
		}
	}
}
