import GSAP from "gsap";
import ASScroll from "@ashthornton/asscroll";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";
import Experience from "../Experience";

export default class Controls {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.sizes = this.experience.sizes;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.room = this.experience.world.room.actualRoom;
		this.rectLight = this.experience.world.room.rectLight;
		this.spotLight = this.experience.world.room.spotLight;
		GSAP.registerPlugin(ScrollTrigger);

		document.querySelector(".page").style.overflow = "visible";

		this.setSmoothScroll();
		this.setScrollTrigger();
	}

	setASSScroll() {
		// https://github.com/ashthornton/asscroll
		const asscroll = new ASScroll({
			ease: 0.2,
			disableRaf: true,
		});

		GSAP.ticker.add(asscroll.update);

		ScrollTrigger.defaults({
			scroller: asscroll.containerElement,
		});

		ScrollTrigger.scrollerProxy(asscroll.containerElement, {
			scrollTop(value) {
				if (arguments.length) {
					asscroll.currentPos = value;
					return;
				}
				return asscroll.currentPos;
			},
			getBoundingClientRect() {
				return {
					top: 0,
					left: 0,
					width: window.innerWidth,
					height: window.innerHeight,
				};
			},
			fixedMarkers: true,
		});

		asscroll.on("update", ScrollTrigger.update);
		ScrollTrigger.addEventListener("refresh", asscroll.resize);

		requestAnimationFrame(() => {
			asscroll.enable({
				newScrollElements: document.querySelectorAll(
					".gsap-marker-start, .gsap-marker-end, [asscroll]"
				),
			});
		});
		return asscroll;
	}

	setSmoothScroll() {
		this.asscroll = this.setASSScroll();
	}

	setScrollTrigger() {
		this.mm = new GSAP.matchMedia();

		// desktop
		this.mm.add("(min-width: 969px)", () => {
			this.room.scale.set(0.045, 0.045, 0.045);
			this.camera.orthoCam.position.set(-1, -0.6, -3);
			this.rectLight.width = 0.7;
			this.rectLight.height = 0.4;
			this.spotLight.distance = 3;

			// first section------------------
			this.firstMoveTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".first-move",
					start: "top top",
					end: "bottom bottom",
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			});
			this.firstMoveTimeLine.to(this.room.position, {
				x: () => {
					return this.sizes.width * 0.0008;
				},
			});

			// second section------------------
			this.secondMoveTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".second-move",
					start: "top top",
					end: "bottom bottom",
					scrub: 1,
					invalidateOnRefresh: true,
				},
			});

			this.secondMoveTimeLine.to(
				this.room.position,
				{
					x: () => {
						return this.sizes.width * -0.0003;
					},

					y: () => {
						return this.sizes.width * -0.0001;
					},

					z: () => {
						return this.sizes.height * 0.00224;
					},
				},
				"same"
			);

			this.secondMoveTimeLine.to(
				this.room.scale,
				{
					x: 0.13,

					y: 0.13,

					z: 0.13,
				},
				"same"
			);

			// third section------------------
			this.thirdMoveTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".third-move",
					start: "top top",
					end: "bottom bottom",
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			}).to(
				this.camera.orthoCam.position,
				{
					x: -4.3,
					y: -4,
					z: -3.456,
				},
				"same"
			);

			this.thirdMoveTimeLine.to(
				this.room.scale,
				{
					x: 0.1,

					y: 0.1,

					z: 0.1,
				},
				"same"
			);
		});

		// mobile
		this.mm.add("(max-width: 968px)", () => {
			this.room.scale.set(0.02, 0.02, 0.02);
			this.room.position.set(0, 0, -1);
			this.camera.orthoCam.position.set(0, 1, 0);
			this.rectLight.width = 0.35;
			this.rectLight.height = 0.2;
			this.spotLight.distance = 0.3;

			// first section------------------
			this.firstMoveTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".first-move",
					start: "top top",
					end: "bottom bottom",
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			}).to(this.room.scale, {
				x: 0.04,
				y: 0.04,
				z: 0.04,
			});

			// second section------------------
			this.secondMoveTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".second-move",
					start: "top top",
					end: "bottom bottom",
					scrub: 1,
					invalidateOnRefresh: true,
				},
			})
				.to(
					this.room.scale,
					{
						x: 0.06,
						y: 0.06,
						z: 0.06,
					},
					"same"
				)
				.to(
					this.room.position,
					{
						x: 1.5,
					},
					"same"
				);

			// third section------------------
			this.thirdMoveTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".third-move",
					start: "top top",
					end: "bottom bottom",
					scrub: 0.8,
					invalidateOnRefresh: true,
				},
			})
				.to(
					this.room.scale,
					{
						x: 0.085,
						y: 0.085,
						z: 0.085,
					},
					"same"
				)
				.to(
					this.camera.orthoCam.position,
					{
						x: 0.72,
						y: -0.858,
						z: 0.002,
					},
					"same"
				);
		});

		// all
		this.mm.add("all", () => {
			// progress bar
			this.sections = document.querySelectorAll(".section");
			this.sections.forEach((section) => {
				this.progressWrapper =
					section.querySelector(".progress-wrapper");
				this.progressBar = section.querySelector(".progress-bar");

				if (section.classList.contains("right")) {
					GSAP.to(section, {
						borderTopLeftRadius: 5,
						scrollTrigger: {
							trigger: section,
							start: "top bottom",
							end: "top top",
							scrub: 0.6,
						},
					});
					GSAP.to(section, {
						borderBottomLeftRadius: 500,
						scrollTrigger: {
							trigger: section,
							start: "bottom bottom",
							end: "bottom top",
							scrub: 0.6,
						},
					});
				} else {
					GSAP.to(section, {
						borderTopRightRadius: 5,
						scrollTrigger: {
							trigger: section,
							start: "top bottom",
							end: "top top",
							scrub: 0.6,
						},
					});
					GSAP.to(section, {
						borderBottomRightRadius: 500,
						scrollTrigger: {
							trigger: section,
							start: "bottom bottom",
							end: "bottom top",
							scrub: 0.6,
						},
					});
				}

				GSAP.from(this.progressBar, {
					scaleY: 0,
					scrollTrigger: {
						trigger: section,
						start: "top top",
						end: "bottom bottom",
						scrub: 0.4,
						pin: this.progressWrapper,
						pinSpacing: false,
					},
				});
			});

			// mini platform animation
			this.platformTimeLine = new GSAP.timeline({
				scrollTrigger: {
					trigger: ".third-move",
					start: "center center",
				},
			});

			this.room.children.forEach((child) => {
				if (child.name === "MiniFloor") {
					this.first = GSAP.to(child.position, {
						x: -12.549,
						y: 0.387,
						z: 42.229,
						ease: "back.out(2)",
						duration: 0.1,
					});

					this.firstScale = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
					});
				}
				if (child.name === "Mailbox") {
					this.second = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
				if (child.name === "Lantern") {
					this.third = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
				if (child.name === "MiniFloor2") {
					this.fourth = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
				if (child.name === "MiniFloor3") {
					this.fifth = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
				if (child.name === "MiniFloor4") {
					this.sixth = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
				if (child.name === "Dirt") {
					this.seventh = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
				if (child.name === "Flowers") {
					this.eighth = GSAP.to(child.scale, {
						x: 1,
						y: 1,
						z: 1,
						ease: "back.out(2)",
						duration: 0.1,
					});
				}
			});

			this.platformTimeLine.add(this.first);
			this.platformTimeLine.add(this.firstScale);
			this.platformTimeLine.add(this.second);
			this.platformTimeLine.add(this.third);
			this.platformTimeLine.add(this.fourth);
			this.platformTimeLine.add(this.fifth);
			this.platformTimeLine.add(this.sixth);
			this.platformTimeLine.add(this.seventh);
			this.platformTimeLine.add(this.eighth);
		});
	}

	resize() {}

	update() {}
}
