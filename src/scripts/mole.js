import * as PIXI from './pixi.js';

export class Mole extends PIXI.Container {
	constructor(textureSheet) {
		super();
		this.SPEED = 0.25;
		this.Animations = {
			NONE: 'none',
			SHOW: 'show',
			STILL: 'still',
			BLINK: 'blink',
			PRESS: 'press',
			DEAD: 'dead',
			HIDE: 'hide',
		};

		this.noneSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['none']);
		this.showSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['show']);
		this.stillSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']);
		this.blinkSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['blink']);
		this.pressSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['press']);
		this.deadSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['dead']);
		this.hideSprite = new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['hide']);

		this.currentAnim = null;
		this.noneSprite.animationSpeed = this.SPEED;
		this.showSprite.animationSpeed = this.SPEED;
		this.stillSprite.animationSpeed = this.SPEED;
		this.blinkSprite.animationSpeed = this.SPEED;
		this.pressSprite.animationSpeed = this.SPEED;
		this.deadSprite.animationSpeed = this.SPEED;
		this.hideSprite.animationSpeed = this.SPEED;
		this.startAnimation(this.Animations.NONE);

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

	show() {
		this.startAnimation(this.Animations.SHOW);
	}

	hide() {
		this.startAnimation(this.Animations.HIDE);
	}

	startAnimation(nextAnim) {
		if (this.currentAnim == nextAnim) return;

		clearTimeout(this.blinkTimeout);

		this.removeChild(this.noneSprite);
		this.removeChild(this.showSprite);
		this.removeChild(this.stillSprite);
		this.removeChild(this.blinkSprite);
		this.removeChild(this.pressSprite);
		this.removeChild(this.deadSprite);
		this.removeChild(this.hideSprite);

		switch (nextAnim) {
			case this.Animations.NONE:
				this.addChild(this.noneSprite);
				this.noneSprite.play();
				break;
			case this.Animations.SHOW:
				this.addChild(this.showSprite);
				this.showSprite.onComplete = () => {
					if (this.currentAnim == this.Animations.SHOW) {
						this.startAnimation(this.Animations.STILL);
					}
				};
				this.showSprite.loop = false;
				this.showSprite.gotoAndPlay(0);
				break;
			case this.Animations.STILL:
				this.addChild(this.stillSprite);
				const startFrame = Math.ceil(8 * Math.random());
				this.stillSprite.gotoAndPlay(startFrame);
				const blinkTime = 800 + Math.floor(2000 * Math.random());
				this.blinkTimeout = setTimeout(() => {
					this.startAnimation(this.Animations.BLINK);
				}, blinkTime);
				break;
			case this.Animations.BLINK:
				this.addChild(this.blinkSprite);
				this.blinkSprite.onComplete = () => {
					if (this.currentAnim == this.Animations.BLINK) {
						this.startAnimation(this.Animations.STILL);
					}
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
				const sFrame = Math.ceil(8 * Math.random());
				this.deadSprite.gotoAndPlay(sFrame);
				break;
			case this.Animations.HIDE:
				this.addChild(this.hideSprite);
				this.hideSprite.onComplete = () => {
					if (this.currentAnim == this.Animations.HIDE) {
						this.startAnimation(this.Animations.NONE);
					}
				};
				this.hideSprite.loop = false;
				this.hideSprite.gotoAndPlay(0);
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
		if (this.currentAnim == this.Animations.PRESS) {
			this.startAnimation(this.Animations.DEAD);
		}
	}
}
