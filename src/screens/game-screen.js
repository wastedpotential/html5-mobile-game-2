import * as PIXI from '../scripts/pixi.js';
import { BasicScreen } from './basic-screen.js';
import { appState } from '../scripts/state';
import { Game } from '../scripts/game';

export class GameScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('game screen');
		const game = new Game(this.renderer);
	}
}
