import { EventEmitter } from "events";
import GSAP from "gsap";
import Experience from "./Experience";
import anime from "animejs";

export default class Preloader extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.world = this.experience.world;
		this.isMobile = this.sizes.isMobile;

		this.sizes.on("switchdevice", (isMobile) => {
			this.isMobile = isMobile;
		});

		this.world.on("worldready", () => {
			this.setAssets();
			this.playLoading();
		});
	}

	textConverter(textWrapper) {
		textWrapper.innerHTML = textWrapper.textContent.replace(
			/([a-zA-Z0-9-!+@#$^_:,.()']|\w)/g,
			"<span class='letter'>$&</span>"
		);
	}

	setAssets() {
		this.textConverter(document.querySelector(".ml11 .letters"));
		this.textConverter(document.querySelector(".ml12 .letters"));
		this.textConverter(document.querySelector(".ml13 .letters"));
		this.room = this.experience.world.room.actualRoom;
		this.roomChildren = this.experience.world.room.roomChildren;
	}

	loadingScreen() {
		return new Promise((resolve) => {
			this.timeline = new GSAP.timeline();
			this.timeline.to(".preloader", {
				opacity: 0,
				onComplete: () => {
					document
						.querySelector(".preloader")
						.classList.add("hidden");
				},
			});
			if (!this.isMobile) {
				this.timeline
					.to(this.roomChildren.cube.scale, {
						x: 4,
						y: 4,
						z: 4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						x: -2,
						ease: "power1.out",
						duration: 0.7,
					});
			} else {
				this.timeline
					.to(this.roomChildren.cube.scale, {
						x: 4,
						y: 4,
						z: 4,
						ease: "back.out(2.5)",
						duration: 0.7,
					})
					.to(this.room.position, {
						z: -1,
						ease: "power1.out",
						duration: 0.7,
					});
			}
			this.animation = new anime.timeline()
				.add({
					targets: ".ml11 .line",
					scaleY: [0, 1],
					opacity: [0.5, 1],
					easing: "easeOutExpo",
					duration: 1200,
				})
				.add({
					targets: ".ml11 .line",
					translateX: [
						0,
						document
							.querySelector(".ml11 .letters")
							.getBoundingClientRect().width + 10,
					],
					easing: "easeOutExpo",
					duration: 700,
					delay: 300,
				})
				.add({
					targets: ".ml11 .letter",
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 600,
					delay: (el, i) => 34 * (i + 1),
				})
				.add({
					targets: ".arrow-svg-wrapper",
					opacity: 1,
				})
				.add(
					{
						targets: ".toggle-bar",
						opacity: 1,
						complete: resolve,
					},
					"-=1000"
				);
			anime.timeline({ loop: true }).add({
				targets: ".ml11 .line",
				opacity: 0,
				duration: 1200,
				easing: "easeInOutSine",
			});
		});
	}

	introScreen() {
		return new Promise((resolve) => {
			this.introTL = new GSAP.timeline();

			anime
				.timeline({ loop: false })
				.add({
					targets: ".ml11",
					opacity: 0,
					easing: "easeOutExpo",
					duration: 100,
				})
				.add({
					targets: ".arrow-svg-wrapper",
					opacity: 0,
				});

			if (!this.isMobile) {
				this.introTL
					.to(
						this.room.position,
						{
							x: 0,
							y: 0,
							z: 0,
							ease: "power1.out",
						},
						"same"
					)
					.to(
						this.roomChildren.cube.rotation,
						{
							y: 2 * Math.PI + Math.PI / 4,
						},
						"same"
					)
					.to(
						this.roomChildren.cube.scale,
						{
							x: 24,
							y: 24,
							z: 24,
						},
						"same"
					)
					.to(
						this.camera.orthoCam.position,
						{
							x: -1,
							y: -0.6,
							z: -3,
						},
						"same"
					)
					.to(
						this.roomChildren.cube.position,
						{
							x: 3.49,
							y: 27.637,
							z: -5.46,
						},
						"same"
					)
					.to(
						this.roomChildren.room.scale,
						{
							x: 1,
							y: 1,
							z: 1,
						},
						"setup"
					)
					.to(
						this.roomChildren.cube.scale,
						{
							x: 0,
							y: 0,
							z: 0,
						},
						"setup"
					)
					.to(
						this.roomChildren.bed.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.4,
						},
						"bed"
					)
					.to(
						this.roomChildren.plushie.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"bed"
					)
					.to(this.roomChildren.shelf.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.3,
					})
					.to(
						this.roomChildren.item1.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"shelf"
					)
					.to(
						this.roomChildren.item2.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"shelf"
					)
					.to(
						this.roomChildren.table.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"table"
					)
					.to(
						this.roomChildren.ontable.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"table"
					)
					.to(
						this.roomChildren.computer.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"table"
					)
					.to(
						this.roomChildren.chairleg.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.5,
						},
						"chair"
					)
					.to(
						this.roomChildren.chair.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"chair"
					)
					.to(
						this.roomChildren.chair.rotation,
						{
							y: 4 * Math.PI + Math.PI / 4,
							ease: "power2.out",
							duration: 1,
						},
						"chair"
					)
					.to(
						this.roomChildren.carpet.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"floor"
					)
					.to(
						this.roomChildren.beanbag.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"floor"
					)
					.to(this.roomChildren.walldecor.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.3,
					});
			} else {
				this.introTL
					.to(this.room.scale, {
						x: 0.02,
						y: 0.02,
						z: 0.02,
						ease: "power1.out",
					})
					.to(
						this.room.position,
						{
							x: 0,
							y: 0,
							z: -1,
							ease: "power1.out",
						},
						"same"
					)
					.to(
						this.roomChildren.cube.rotation,
						{
							y: 2 * Math.PI + Math.PI / 4,
						},
						"same"
					)
					.to(
						this.camera.orthoCam.position,
						{
							x: 0,
							y: 1,
							z: 0,
						},
						"same"
					)
					.to(
						this.roomChildren.cube.position,
						{
							x: 3.49,
							y: 27.637,
							z: -5.46,
						},
						"same"
					)
					.to(
						this.roomChildren.cube.scale,
						{
							x: 24,
							y: 24,
							z: 24,
						},
						"same"
					)
					.to(
						this.roomChildren.room.scale,
						{
							x: 1,
							y: 1,
							z: 1,
						},
						"setup"
					)
					.to(
						this.roomChildren.cube.scale,
						{
							x: 0,
							y: 0,
							z: 0,
						},
						"setup"
					)
					.to(
						this.roomChildren.bed.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.4,
						},
						"bed"
					)
					.to(
						this.roomChildren.plushie.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"bed"
					)
					.to(this.roomChildren.shelf.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.3,
					})
					.to(
						this.roomChildren.item1.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"shelf"
					)
					.to(
						this.roomChildren.item2.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"shelf"
					)
					.to(
						this.roomChildren.table.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"table"
					)
					.to(
						this.roomChildren.ontable.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"table"
					)
					.to(
						this.roomChildren.computer.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"table"
					)
					.to(
						this.roomChildren.chairleg.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.5,
						},
						"chair"
					)
					.to(
						this.roomChildren.chair.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"chair"
					)
					.to(
						this.roomChildren.chair.rotation,
						{
							y: 4 * Math.PI + Math.PI / 4,
							ease: "power2.out",
							duration: 1,
						},
						"chair"
					)
					.to(
						this.roomChildren.carpet.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"floor"
					)
					.to(
						this.roomChildren.beanbag.scale,
						{
							x: 1,
							y: 1,
							z: 1,
							ease: "back.out(2.2)",
							duration: 0.3,
						},
						"floor"
					)
					.to(this.roomChildren.walldecor.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2.2)",
						duration: 0.3,
					});
			}

			this.introAnimation = anime
				.timeline({ loop: false })
				.add({
					targets: ".ml12",
					opacity: 1,
				})
				.add({
					targets: ".ml12 .line",
					scaleY: [0, 1],
					opacity: [0.5, 1],
					easing: "easeOutExpo",
					duration: 200,
				})
				.add({
					targets: ".ml12 .line",
					translateX: [
						0,
						document
							.querySelector(".ml12 .letters")
							.getBoundingClientRect().width + 10,
					],
					easing: "easeOutExpo",
					duration: 700,
					delay: 100,
				})
				.add({
					targets: ".ml12 .letter",
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 600,
					offset: "-=775",
					delay: (el, i) => 10 * (i + 1),
				})
				.add({
					targets: ".ml12 .line",
					opacity: 0,
				})
				.add(
					{
						targets: ".ml13",
						opacity: 1,
						duration: 0,
					},
					"-=600"
				)
				.add(
					{
						targets: ".ml13 .line",
						scaleY: [0, 1],
						opacity: [0.5, 1],
						easing: "easeOutExpo",
						duration: 200,
					},
					"-=400"
				)
				.add({
					targets: ".ml13 .line",
					translateX: [
						0,
						document
							.querySelector(".ml13 .letters")
							.getBoundingClientRect().width + 10,
					],
					easing: "easeOutExpo",
					duration: 300,
					delay: 100,
				})
				.add({
					targets: ".ml13 .letter",
					opacity: [0, 1],
					easing: "easeOutExpo",
					duration: 300,
					offset: "-=775",
					delay: (el, i) => 10 * (i + 1),
				})
				.add({
					targets: ".ml13 .line",
					opacity: 0,
				})
				.add({
					targets: ".arrow-svg-wrapper",
					opacity: 1,
				});
			this.introAnimation.finished.then(resolve);
		});
	}

	onScroll(e) {
		if (e.deltaY > 0) {
			this.removeEventListeners();
			this.playIntro();
		}
	}

	onTouch(e) {
		this.initialY = e.touches[0].clientY;
	}

	onTouchMove(e) {
		let currentY = e.touches[0].clientY;
		let difference = this.initialY - currentY;
		if (difference > 0) {
			console.log("swipped up");
			this.removeEventListeners();
			this.playIntro();
		}
		this.initialY = null;
	}

	removeEventListeners() {
		window.removeEventListener("wheel", this.scrollEvent);
		window.removeEventListener("touchstart", this.touchStart);
		window.removeEventListener("touchmove", this.touchMove);
	}

	async playLoading() {
		await this.loadingScreen();
		console.log(this.roomChildren.cube);
		this.canMoveCube = true;
		this.scrollEvent = this.onScroll.bind(this);
		this.touchStart = this.onTouch.bind(this);
		this.touchMove = this.onTouchMove.bind(this);
		window.addEventListener("wheel", this.scrollEvent);
		window.addEventListener("touchstart", this.touchStart);
		window.addEventListener("touchmove", this.touchMove);
	}

	async playIntro() {
		this.canMoveCube = false;
		await this.introScreen();
		this.emit("enablecontrols");
	}

	move() {
		if (!this.isMobile) {
			this.room.position.set(-2, 0, 0);
		} else {
			this.room.position.set(0, 0, -1);
		}
	}

	update() {
		if (this.canMoveCube) {
			this.move();
		}
	}
}
