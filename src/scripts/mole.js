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
		this.showSprite.animationSpeed = this.SPEED;
		this.stillSprite.animationSpeed = this.SPEED;
		this.blinkSprite.animationSpeed = this.SPEED;
		this.pressSprite.animationSpeed = this.SPEED;
		this.deadSprite.animationSpeed = this.SPEED;
		this.startAnimation(this.Animations.STILL);

		// const texButton = textureSheet.textures['menubar_site_btn.png'];
		// this.siteButton = new PIXI.Sprite(texButton);
		// this.addChild(this.siteButton);
		// this.siteButton.anchor.set(1, 0);
		this.interactive = true;
		this.buttonMode = true;
		this.defaultCursor = 'pointer';
		this.on('mousedown', this.onPressDown).on('touchstart', this.onPressDown);
		this.on('mouseup', this.onPressUp).on('mouseupoutside', this.onPressUp).on('touchend', this.onPressUp).on('touchendoutside', this.onPressUp);
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

	show() {}

	hide() {}

	startAnimation(nextAnim) {
		if (this.currentAnim == nextAnim) return;

		clearTimeout(this.blinkTimeout);

		this.removeChild(this.showSprite);
		this.removeChild(this.stillSprite);
		this.removeChild(this.blinkSprite);
		this.removeChild(this.pressSprite);
		this.removeChild(this.deadSprite);

		switch (nextAnim) {
			case this.Animations.SHOW:
				break;
			case this.Animations.STILL:
				this.addChild(this.stillSprite);
				this.stillSprite.play();
				const blinkTime = 800 + Math.floor(2000 * Math.random());
				this.blinkTimeout = setTimeout(() => {
					this.startAnimation(this.Animations.BLINK);
				}, blinkTime);
				break;
			case this.Animations.BLINK:
				this.addChild(this.blinkSprite);
				this.blinkSprite.onComplete = () => {
					console.log('done');
					this.startAnimation(this.Animations.STILL);
				};
				this.blinkSprite.loop = false;
				this.blinkSprite.gotoAndPlay(0);
				break;
			case this.Animations.PRESS:
				this.addChild(this.pressSprite);
				this.pressSprite.play();
				break;
			case this.Animations.DEAD:
				this.addChild(this.deadSprite);
				this.deadSprite.play();
				break;
		}
		this.currentAnim = nextAnim;
	}

	onPressDown() {
		if (this.currentAnim == this.Animations.STILL || this.currentAnim == this.Animations.BLINK) {
			this.startAnimation(this.Animations.PRESS);
		}
	}

	onPressUp() {
		this.startAnimation(this.Animations.DEAD);
	}
}
