import * as PIXI from '../../scripts/pixi.js';
import * as data from '../../scripts/data.js';

export class Mole extends PIXI.Container {
	isPressed = false;
	onMolePressDown = null;
	onMolePressUp = null;
	#animations = null;
	#currentAnim = null;

	// ============== PUBLIC METHODS ==============
	constructor(textureSheet, onMolePressDown, onMolePressUp) {
		super();

		this.onMolePressDown = onMolePressDown;
		this.onMolePressUp = onMolePressUp;

		this.#animations = {
			none: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['none']),
			show: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['show']),
			still: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['still']),
			blink: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['blink']),
			press: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['press']),
			dead: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['dead']),
			hide: new PIXI.AnimatedSprite(textureSheet.spritesheet.animations['hide']),
		};

		// set properties on all animations:
		for (var key in this.#animations) {
			if (!this.#animations.hasOwnProperty(key)) continue; // skip prototype properties
			this.#animations[key].animationSpeed = data.animationSpeed;
			this.#animations[key].anchor.set(0.5, 0.5);
		}
		this.#startAnimation(this.#animations.none);

		// const texButton = textureSheet.textures['menubar_site_btn.png'];
		// this.siteButton = new PIXI.Sprite(texButton);
		// this.addChild(this.siteButton);

		// TODO: narrow the hit area to not just be anywhere on the sprite:
		this.interactive = true;
		this.buttonMode = true;
		this.defaultCursor = 'pointer';
		this.on('mousedown', this.#onPressDown).on('touchstart', this.#onPressDown);
		this.on('mouseup', this.#onPressUp).on('mouseupoutside', this.#onPressUp).on('touchend', this.#onPressUp).on('touchendoutside', this.#onPressUp);
		// this.#resize(width);
	}

	show() {
		this.#startAnimation(this.#animations.show);
	}

	hide() {
		if (this.#currentAnim !== this.#animations.none) {
			this.#startAnimation(this.#animations.hide);
		}
	}

	press() {}

	release() {}

	// ============== PRIVATE METHODS ==============

	#resize(width) {
		// const half = Math.ceil(width / 2);
		// if (this.bg) {
		// 	this.bg.width = width + 10;
		// 	this.bg.position.set(-1 * half, 0);
		// }
		// if (this.siteButton) {
		// 	this.siteButton.position.set(half, 0);
		// }
	}

	#startAnimation(nextAnim) {
		if (this.#currentAnim == nextAnim) return;

		clearTimeout(this.blinkTimeout);

		this.removeChild(this.#currentAnim);

		this.addChild(nextAnim);
		switch (nextAnim) {
			case this.#animations.none:
				nextAnim.play();
				break;
			case this.#animations.show:
				nextAnim.onComplete = () => {
					if (this.#currentAnim == this.#animations.show) {
						this.#startAnimation(this.#animations.still);
					}
				};
				nextAnim.loop = false;
				nextAnim.gotoAndPlay(0);
				break;
			case this.#animations.still:
				const startFrame = Math.ceil(8 * Math.random());
				nextAnim.gotoAndPlay(startFrame);
				const blinkTime = 400 + Math.floor(1000 * Math.random());
				this.blinkTimeout = setTimeout(() => {
					this.#startAnimation(this.#animations.blink);
				}, blinkTime);
				break;
			case this.#animations.blink:
				nextAnim.onComplete = () => {
					if (this.#currentAnim == this.#animations.blink) {
						this.#startAnimation(this.#animations.still);
					}
				};
				nextAnim.loop = false;
				nextAnim.gotoAndPlay(0);
				break;
			case this.#animations.press:
				nextAnim.play();
				break;
			case this.#animations.dead:
				const sFrame = Math.ceil(8 * Math.random());
				nextAnim.gotoAndPlay(sFrame);
				break;
			case this.#animations.hide:
				nextAnim.onComplete = () => {
					if (this.#currentAnim == this.#animations.hide) {
						this.#startAnimation(this.#animations.none);
					}
				};
				nextAnim.loop = false;
				nextAnim.gotoAndPlay(0);
				break;
		}
		this.#currentAnim = nextAnim;
	}

	#onPressDown() {
		if (this.#currentAnim == this.#animations.still || this.#currentAnim == this.#animations.blink) {
			this.onMolePressDown(this); // let game controller decide what to do
		}
	}

	#onPressUp() {
		clearTimeout(this.hurtTimeout);
		this.onMolePressUp(this); //tell the game controller that we've let go of this mole
	}

	hurtMole() {
		this.#startAnimation(this.#animations.press);
		const hurtTime = 100;
		this.hurtTimeout = setTimeout(() => {
			this.onPressUp();
		}, hurtTime);
	}

	killMole() {
		if (this.#currentAnim == this.#animations.press) {
			this.#startAnimation(this.#animations.dead);
			console.log('add 1 to score'); // increment score
		}
	}
}
