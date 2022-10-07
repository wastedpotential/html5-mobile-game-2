import * as PIXI from '../../scripts/pixi.js';
import { BasicScreen } from '../basic-screen.js';
import { appState } from '../../scripts/state';

export class ScoresScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('high scores screen');
		const dummyText = new PIXI.Text('This is the high scores screen', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		dummyText.anchor.set(0.5, 0.5);
		this.view.addChild(dummyText);
	}
}
