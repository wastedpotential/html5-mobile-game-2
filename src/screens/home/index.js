import { BasicScreen } from '../basic-screen.js';
import { Menu } from './menu.js';

export class HomeScreen extends BasicScreen {
	// ============== PUBLIC METHODS ==============

	constructor() {
		super();
		console.log('home screen!');
		const menu = new Menu();
		this.view.addChild(menu);
	}
}
