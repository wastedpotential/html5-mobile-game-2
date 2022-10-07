import { BasicScreen } from '../basic-screen.js';
import { Scoreboard } from './scoreboard.js';

export class ScoresScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('high scores screen');
		const scoreboard = new Scoreboard();
		this.view.addChild(scoreboard);
	}
}
