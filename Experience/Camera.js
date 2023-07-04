import * as THREE from "three";
import Experience from "./Experience";
import GUI from "lil-gui";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
	constructor() {
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;

		// this.gui = new GUI();
		// this.myObject = {
		// 	x: 0.002,
		// 	y: 0.002,
		// 	z: 0.002,
		// };

		// this.setGUI();

		this.createPerspectiveCam();
		this.createOrthoCam();
		this.setOrbitControls();
	}

	// setGUI() {
	// 	this.gui.add(this.myObject, "x", -50, 50).onChange(() => {
	// 		this.orthoCam.position.x = this.myObject.x;
	// 	});
	// 	this.gui.add(this.myObject, "y", -20, 20).onChange(() => {
	// 		this.orthoCam.position.y = this.myObject.y;
	// 	});
	// 	this.gui.add(this.myObject, "z", -50, 50).onChange(() => {
	// 		this.orthoCam.position.z = this.myObject.z;
	// 	});
	// }

	createPerspectiveCam() {
		this.perspectiveCam = new THREE.PerspectiveCamera(
			35,
			this.sizes.aspect,
			0.1,
			1000
		);
		this.scene.add(this.perspectiveCam);
		this.perspectiveCam.position.x = 29;
		this.perspectiveCam.position.y = 14;
		this.perspectiveCam.position.z = 12;
	}

	createOrthoCam() {
		this.orthoCam = new THREE.OrthographicCamera(
			(-this.sizes.aspect * this.sizes.frustrum) / 2,
			(this.sizes.aspect * this.sizes.frustrum) / 2,
			this.sizes.frustrum / 2,
			-this.sizes.frustrum / 2,
			-50,
			50
		);
		this.orthoCam.position.set(0, -0.16, 0);
		this.orthoCam.rotation.x = -Math.PI / 6;
		this.scene.add(this.orthoCam);
	}

	setOrbitControls() {
		this.controls = new OrbitControls(this.perspectiveCam, this.canvas);
		this.controls.enableDamping = true;
		this.controls.enableZoom = true;
	}

	resize() {
		//updating perspective cam on resize
		this.perspectiveCam.aspect = this.sizes.aspect;
		this.perspectiveCam.updateProjectionMatrix();

		//upating ortho cam on resize
		this.orthoCam.left = (-this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthoCam.right = (this.sizes.aspect * this.sizes.frustrum) / 2;
		this.orthoCam.top = this.sizes.frustrum / 2;
		this.orthoCam.bottom = -this.sizes.frustrum / 2;
		this.orthoCam.updateProjectionMatrix();
	}

	update() {
		this.controls.update();
	}
}
