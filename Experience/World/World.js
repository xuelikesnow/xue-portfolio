import * as THREE from "three";
import Experience from "../Experience";
import { EventEmitter } from "events";

import Room from "./Room";
import Controls from "./Controls";
import Environment from "./Environment";
import Floor from "./Floor";

export default class World extends EventEmitter {
	constructor() {
		super();
		this.experience = new Experience();
		this.sizes = this.experience.sizes;
		this.scene = this.experience.scene;
		this.canvas = this.experience.canvas;
		this.camera = this.experience.camera;
		this.resources = this.experience.resources;
		this.theme = this.experience.theme;

		this.resources.on("ready", () => {
			this.room = new Room();
			this.environment = new Environment();
			this.floor = new Floor();
			//this.controls = new Controls();
			this.emit("worldready");
		});

		this.theme.on("switch", (theme) => {
			this.switchTheme(theme);
		});
	}

	switchTheme(theme) {
		if (this.environment) {
			this.environment.switchTheme(theme);
		}
	}

	resize() {}

	update() {
		if (this.room) {
			this.room.update();
		}

		if (this.controls) {
			this.controls.update();
		}
	}
}
