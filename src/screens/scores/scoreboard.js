import * as PIXI from '../../scripts/pixi.js';

export class Scoreboard extends PIXI.Container {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		const dummyText = new PIXI.Text('This is the high scores screen', { fontFamily: 'Arial', fontSize: 24, fill: 0xff1010, align: 'center' });
		dummyText.anchor.set(0.5, 0.5);
		this.addChild(dummyText);
	}
}
