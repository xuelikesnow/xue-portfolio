import { EventEmitter } from "events";

export default class Sizes extends EventEmitter {
	constructor() {
		super();
		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.aspect = this.width / this.height;
		this.pixelRatio = Math.min(window.devicePixelRatio, 2);
		this.frustrum = 5;
		if (this.width < 968) {
			this.isMobile = true;
		} else {
			this.isMobile = false;
		}

		window.addEventListener("resize", () => {
			this.width = window.innerWidth;
			this.height = window.innerHeight;
			this.aspect = this.width / this.height;
			this.pixelRatio = Math.min(window.devicePixelRatio, 2);
			this.emit("resize");

			if (this.width < 968 && !this.isMobile) {
				this.isMobile = true;
				this.emit("switchdevice", this.isMobile);
			} else if (this.width >= 968 && this.isMobile) {
				this.isMobile = false;
				this.emit("switchdevice", this.isMobile);
			}
		});
	}
}
