import * as THREE from "three";
import GUI from "lil-gui";
import GSAP from "gsap";
import Experience from "../Experience";

export default class Room {
	constructor() {
		this.experience = new Experience();
		this.scene = this.experience.scene;
		this.resources = this.experience.resources;
		this.room = this.resources.items.room;
		this.actualRoom = this.room.scene;
		this.roomChildren = {};

		this.lerp = {
			current: 0,
			target: 0,
			ease: 0.1,
		};

		this.setModel();
		this.onMouseMove();
	}

	setModel() {
		this.actualRoom.children.forEach((child) => {
			child.castShadow = true;
			child.receiveShadow = true;
			child.scale.set(0, 0, 0);
			this.roomChildren[child.name.toLowerCase()] = child;

			if (child instanceof THREE.Group) {
				child.children.forEach((groupChild) => {
					groupChild.castShadow = true;
					groupChild.receiveShadow = true;
				});
			}

			if (child.name === "Computer") {
				child.children[1].material = new THREE.MeshBasicMaterial({
					map: this.resources.items.screen,
				});
				child.children[1].scale.set(1, 1, -1);
				child.children[1].material.shadowSide = THREE.DoubleSide;
			}

			if (child.name === "MiniFloor") {
				child.position.x = 11;
				child.position.z = 18.229;
			}

			if (child.name === "Lantern") {
				child.children[0].material = new THREE.MeshPhysicalMaterial({});
				child.children[0].material.roughness = 0.5;
				child.children[0].material.color.set(0xffffff);
				child.children[0].material.ior = 1.5;
				child.children[0].material.transmission = 1;
				child.children[0].material.opacity = 0;
			}

			if (child.name === "Cube") {
				child.scale.set(2, 2, 2);
				child.position.set(0, 4, 0);
				child.rotation.y = Math.PI / 4;
			}
		});

		this.rectLight = new THREE.RectAreaLight(0x1c92ed, 2, 0.7, 0.4);
		this.rectLight.position.set(31.55, 21.1, -0.77);
		this.rectLight.rotateY(-Math.PI / 4);
		this.actualRoom.add(this.rectLight);

		const neonLight = new THREE.PointLight(0x1c92ed, 3, 10, 2);
		neonLight.position.set(32.785, 20, -1.5);
		neonLight.rotateY(-Math.PI / 4);
		this.actualRoom.add(neonLight);

		const lamp = new THREE.PointLight(0xf2b95e, 2, 3, 2);
		lamp.position.set(-23.8, 11.9, 7);
		this.actualRoom.add(lamp);

		this.spotLight = new THREE.SpotLight(0xf2b95e, 1, 3, Math.PI / 4, 0, 2);
		this.spotLight.position.set(-26.2, 11.9, 7);
		this.spotLight.rotateY(-Math.PI / 6);
		this.actualRoom.add(this.spotLight);

		this.lantern = new THREE.PointLight(0xffffff, 2, 3, 2);
		this.lantern.position.set(-12.7, 8.2, 30.3);
		this.actualRoom.add(this.lantern);

		this.roomChildren["rectLight"] = this.rectLight;
		this.roomChildren["neonLight"] = this.neonLight;
		this.roomChildren["lamp"] = this.lamp;
		this.roomChildren["spotLight"] = this.spotLight;
		this.roomChildren["lantern"] = this.lantern;

		this.scene.add(this.actualRoom);
		this.actualRoom.scale.set(0.045, 0.045, 0.045);
	}

	onMouseMove() {
		window.addEventListener("mousemove", (e) => {
			this.rotation =
				((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
			this.lerp.target = this.rotation * 0.2;
		});
	}

	resize() {}

	update() {
		this.lerp.current = GSAP.utils.interpolate(
			this.lerp.current,
			this.lerp.target,
			this.lerp.ease
		);

		this.actualRoom.rotation.y = this.lerp.current;
	}
}
