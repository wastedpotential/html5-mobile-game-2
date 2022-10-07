import * as PIXI from '../../scripts/pixi.js';
import { appState } from '../../scripts/state';
import { GameScreen } from '../game';
import { ScoresScreen } from '../scores';
import * as data from '../../scripts/data.js';

export class Menu extends PIXI.Container {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		const textureSheet = appState.spriteSheet;
		const homeButton = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		homeButton.animationSpeed = data.animationSpeed;
		homeButton.anchor.set(0.5, 0.5);
		homeButton.position.set(-150, 0);
		homeButton.interactive = true;
		homeButton.buttonMode = true;
		homeButton.defaultCursor = 'pointer';
		homeButton.play();
		homeButton.on('mouseup', this.#onHomePressUp).on('mouseupoutside', this.#onHomePressUp).on('touchend', this.#onHomePressUp).on('touchendoutside', this.#onHomePressUp);
		this.addChild(homeButton);
		const homeText = new PIXI.Text('PLAY', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		homeText.anchor.set(0.5, 0.5);
		homeText.position.set(-150, 0);
		this.addChild(homeText);

		const scoresButton = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		scoresButton.animationSpeed = data.animationSpeed;
		scoresButton.anchor.set(0.5, 0.5);
		scoresButton.position.set(150, 0);
		scoresButton.interactive = true;
		scoresButton.buttonMode = true;
		scoresButton.defaultCursor = 'pointer';
		scoresButton.play();
		scoresButton.on('mouseup', this.#onScoresPressUp).on('mouseupoutside', this.#onScoresPressUp).on('touchend', this.#onScoresPressUp).on('touchendoutside', this.#onScoresPressUp);
		this.addChild(scoresButton);
		const scoresText = new PIXI.Text('SCORES', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		scoresText.anchor.set(0.5, 0.5);
		scoresText.position.set(150, 0);
		this.addChild(scoresText);
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
