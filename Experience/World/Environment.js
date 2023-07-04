import * as THREE from "three";
import GSAP from "gsap";
import GUI from "lil-gui";
import Experience from "../Experience";

export default class Environment {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;

		this.setSunLight();
	}

	setSunLight() {
		this.sunLight = new THREE.DirectionalLight("#ffffff", 3);
		this.sunLight.castShadow = true;
		this.sunLight.shadow.camera.far = 20;
		this.sunLight.shadow.mapSize.set(2048, 2048);
		this.sunLight.shadow.normalBias = 0.05;
		this.sunLight.position.set(1.5, 5, 3);
		this.scene.add(this.sunLight);

		this.ambLight = new THREE.AmbientLight("#ffd6da", 0.7);
		this.scene.add(this.ambLight);
	}

	switchTheme(theme) {
		if (theme === "dark") {
			GSAP.to(this.sunLight.color, {
				r: 37 / 255,
				g: 50 / 255,
				b: 116 / 255,
			});
			GSAP.to(this.ambLight.color, {
				r: 27 / 255,
				g: 17 / 255,
				b: 71 / 255,
			});
			GSAP.to(this.sunLight, {
				intensity: 0.78,
			});
		} else {
			GSAP.to(this.sunLight.color, {
				r: 255 / 255,
				g: 255 / 255,
				b: 255 / 255,
			});
			GSAP.to(this.ambLight.color, {
				r: 255 / 255,
				g: 214 / 255,
				b: 218 / 255,
			});
			GSAP.to(this.sunLight, {
				intensity: 3,
			});
		}
	}

	resize() {}

	update() {}
}
