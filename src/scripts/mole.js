import * as PIXI from './pixi.js';

export class Mole extends PIXI.Container {
	constructor(textureSheet) {
		super();
		this.SPEED = 0.25;
		this.Animations = {
			SHOW: 'show',
			STILL: 'still',
			BLINK: 'blink',
			PRESS: 'press',
			DEAD: 'dead',
		};

		this.showSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['show']);
		this.stillSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		this.blinkSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['blink']);
		this.pressSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['press']);
		this.deadSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['dead']);

		this.currentAnim = null;
		this.stillSprite.animationSpeed = this.SPEED;
		this.startAnimation(this.Animations.STILL);

		// const texButton = textureSheet.textures['menubar_site_btn.png'];
		// this.siteButton = new PIXI.Sprite(texButton);
		// this.addChild(this.siteButton);
		// this.siteButton.anchor.set(1, 0);
		this.interactive = true;
		this.buttonMode = true;
		this.defaultCursor = 'pointer';
		this.on('mouseup', this.onButtonUp).on('mouseupoutside', this.onButtonUp).on('touchend', this.onButtonUp).on('touchendoutside', this.onButtonUp);
		// this.resize(width);
	}

	resize(width) {
		// const half = Math.ceil(width / 2);
		// if (this.bg) {
		// 	this.bg.width = width + 10;
		// 	this.bg.position.set(-1 * half, 0);
		// }
		// if (this.siteButton) {
		// 	this.siteButton.position.set(half, 0);
		// }
	}

	startAnimation(nextAnim) {
		if (this.currentAnim == nextAnim) return;

		this.removeChild(this.stillSprite);

		switch (nextAnim) {
			case this.Animations.SHOW:
				break;
			case this.Animations.STILL:
				console.log('==', this.stillSprite);
				this.addChild(this.stillSprite);
				this.stillSprite.play();
				break;
			case this.Animations.BLINK:
				this.addChild(this.blinkSprite);
				this.blinkSprite.play();
				break;
			case this.Animations.PRESS:
				break;
			case this.Animations.DEAD:
				break;
		}
		this.currentAnim = nextAnim;
	}

	onButtonUp() {
		this.startAnimation(this.Animations.BLINK);
	}
}
