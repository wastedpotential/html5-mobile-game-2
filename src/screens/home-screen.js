import * as PIXI from '../scripts/pixi.js';
import { BasicScreen } from './basic-screen.js';
import { appState } from '../scripts/state';
import { GameScreen } from './game-screen';
import { ScoresScreen } from './scores-screen';
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
		homeButton.position.set(-150, 0);
		homeButton.interactive = true;
		homeButton.buttonMode = true;
		homeButton.defaultCursor = 'pointer';
		homeButton.play();
		homeButton.on('mouseup', this.#onHomePressUp).on('mouseupoutside', this.#onHomePressUp).on('touchend', this.#onHomePressUp).on('touchendoutside', this.#onHomePressUp);
		this.view.addChild(homeButton);
		let homeText = new PIXI.Text('PLAY', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		homeText.anchor.set(0.5, 0.5);
		homeText.position.set(-150, 0);
		this.view.addChild(homeText);

		let scoresButton = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		scoresButton.animationSpeed = data.animationSpeed;
		scoresButton.anchor.set(0.5, 0.5);
		scoresButton.position.set(150, 0);
		scoresButton.interactive = true;
		scoresButton.buttonMode = true;
		scoresButton.defaultCursor = 'pointer';
		scoresButton.play();
		scoresButton.on('mouseup', this.#onScoresPressUp).on('mouseupoutside', this.#onScoresPressUp).on('touchend', this.#onScoresPressUp).on('touchendoutside', this.#onScoresPressUp);
		this.view.addChild(scoresButton);
		let scoresText = new PIXI.Text('SCORES', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		scoresText.anchor.set(0.5, 0.5);
		scoresText.position.set(150, 0);
		this.view.addChild(scoresText);
	}

	#onHomePressUp() {
		const gameScreen = new GameScreen();
		appState.navigator.navigateTo(gameScreen);
	}

	#onScoresPressUp() {
		const scoresScreen = new ScoresScreen();
		appState.navigator.navigateTo(scoresScreen);
	}
}
