import * as PIXI from '../scripts/pixi.js';
import { BasicScreen } from './basic-screen.js';
import { appState } from '../scripts/state';
import { GameScreen } from './game-screen';
import { Game } from '../scripts/game';

export class HomeScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('home screen!');
		console.log('sheet:', appState.spriteSheet);
		let textureSheet = appState.spriteSheet;
		let herp = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		herp.interactive = true;
		herp.buttonMode = true;
		herp.defaultCursor = 'pointer';
		herp.on('mouseup', this.#onPressUp).on('mouseupoutside', this.#onPressUp).on('touchend', this.#onPressUp).on('touchendoutside', this.#onPressUp);
		this.view.addChild(herp);
		// const game = new Game(this.view);
	}

	#onPressUp() {
		let gameScreen = new GameScreen();
		appState.navigator.navigateTo(gameScreen);
	}
}
