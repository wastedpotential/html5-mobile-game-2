export class Navigator {
	#app;
	#currentScreen;
	#nextScreen;
	#isNavigating = false;

	constructor(app) {
		this.#app = app;
	}

	navigateTo(screen) {
		console.log(screen, this.#currentScreen, this.#isNavigating);
		if (screen == this.#currentScreen) return;
		if (this.#isNavigating) return;
		this.#isNavigating = true;
		this.#nextScreen = screen;
		if (this.#currentScreen) {
			console.log('removing...');
			this.#app.stage.removeChild(this.#currentScreen.renderer);
			// this.#currentScreen.hide(this.showNextScreen);
		}
		this.showNextScreen();
	}

	showNextScreen() {
		console.log('show next...');
		this.#currentScreen = this.#nextScreen;
		this.#nextScreen = null;
		this.#app.stage.addChild(this.#currentScreen.renderer);
		console.log('~~~', this.onShow);
		this.#currentScreen.show(this.onShow);
		this.#isNavigating = false;
	}

	onShow() {
		console.log('~~~~~');
		console.log('##', this, this.#isNavigating);
		this.#isNavigating = false;
	}
}
