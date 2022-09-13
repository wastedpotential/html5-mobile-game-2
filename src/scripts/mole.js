import * as PIXI from './pixi.js';

export class Mole extends PIXI.Container {
	constructor(textureSheet) {
		super();
		this.SPEED = 0.25;
		this.animations = {
			none: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['none']),
			show: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['show']),
			still: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']),
			blink: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['blink']),
			press: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['press']),
			dead: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['dead']),
			hide: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['hide']),
		};

		this.currentAnim = null;

		for (var prop in this.animations) {
			if (!this.animations.hasOwnProperty(prop)) continue; // skip prototype properties
			// prop.animationSpeed = this.SPEED;
			console.log(typeof prop);
		}
		this.startAnimation(this.animations.none);

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
		this.startAnimation(this.animations.show);
	}

	hide() {
		this.startAnimation(this.animations.hide);
	}

	startAnimation(nextAnim) {
		if (this.currentAnim == nextAnim) return;

		clearTimeout(this.blinkTimeout);

		this.removeChild(this.currentAnim);

		this.addChild(nextAnim);
		switch (nextAnim) {
			case this.animations.none:
				nextAnim.play();
				break;
			case this.animations.show:
				nextAnim.onComplete = () => {
					if (this.currentAnim == this.animations.show) {
						this.startAnimation(this.animations.still);
					}
				};
				nextAnim.loop = false;
				nextAnim.gotoAndPlay(0);
				break;
			case this.animations.still:
				const startFrame = Math.ceil(8 * Math.random());
				nextAnim.gotoAndPlay(startFrame);
				const blinkTime = 800 + Math.floor(2000 * Math.random());
				this.blinkTimeout = setTimeout(() => {
					this.startAnimation(this.animations.blink);
				}, blinkTime);
				break;
			case this.animations.blink:
				nextAnim.onComplete = () => {
					if (this.currentAnim == this.animations.blink) {
						this.startAnimation(this.animations.still);
					}
				};
				nextAnim.loop = false;
				nextAnim.gotoAndPlay(0);
				break;
			case this.animations.press:
				nextAnim.play();
				break;
			case this.animations.dead:
				const sFrame = Math.ceil(8 * Math.random());
				nextAnim.gotoAndPlay(sFrame);
				break;
			case this.animations.hide:
				nextAnim.onComplete = () => {
					if (this.currentAnim == this.animations.hide) {
						this.startAnimation(this.animations.none);
					}
				};
				nextAnim.loop = false;
				nextAnim.gotoAndPlay(0);
				break;
		}
		this.currentAnim = nextAnim;
	}

	onPressDown() {
		if (this.currentAnim == this.animations.still || this.currentAnim == this.animations.blink) {
			this.startAnimation(this.animations.press);
		}
	}

	onPressUp() {
		if (this.currentAnim == this.animations.press) {
			this.startAnimation(this.animations.dead);
		}
	}
}
