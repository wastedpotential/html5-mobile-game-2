import * as PIXI from '../scripts/pixi.js';
import { BasicScreen } from './basic-screen.js';
import { appState } from '../scripts/state';

export class ScoresScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('high scores screen');
	}
}
