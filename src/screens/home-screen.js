import * as PIXI from '../scripts/pixi.js';
import { BasicScreen } from './basic-screen.js';
import { appState } from '../scripts/state';
import { GameScreen } from './game-screen';
import { Game } from '../scripts/game';
import * as data from '../scripts/data.js';

export class HomeScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('home screen!');
		let textureSheet = appState.spriteSheet;
		let homeButton = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		homeButton.animationSpeed = data.animationSpeed;
		homeButton.anchor.set(0.5, 0.5);
		homeButton.interactive = true;
		homeButton.buttonMode = true;
		homeButton.defaultCursor = 'pointer';
		homeButton.play();
		homeButton.on('mouseup', this.#onPressUp).on('mouseupoutside', this.#onPressUp).on('touchend', this.#onPressUp).on('touchendoutside', this.#onPressUp);
		this.view.addChild(homeButton);
		let homeText = new PIXI.Text('PLAY', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		homeText.anchor.set(0.5, 0.5);
		this.view.addChild(homeText);
		// const game = new Game(this.view);
	}

	#onPressUp() {
		let gameScreen = new GameScreen();
		appState.navigator.navigateTo(gameScreen);
	}
}
