

export class TimeManager {
    private lastUpdate = performance.now();
    private tickCount = 0;
    private deltaT = 1;
    private updateMethods: Array<(deltaTime: number) => void> = [];

    // private lastFixUpdate = performance.now();
    // private fixTickCount = 0;
    // private fixDeltaT = 1;
    // private fixUpdateMethods: Array<(deltaTime: number) => void> = [];

    FPS = 0;
    TPS = 0;

    start() {
        this.lastUpdate = performance.now();
        this.tickCount = 0;
        this.deltaT = 1;

        // this.lastFixUpdate = performance.now();
        // this.fixTickCount = 0;
        // this.fixDeltaT = 1;

        this.FPS = 0;
        this.TPS = 0;

        requestAnimationFrame(this.update.bind(this));
    }

    clear() {
        this.updateMethods = [];
        // this.fixUpdateMethods = [];
    }

    addUpdateMethods(method: (deltaTime: number) => void) {
        this.updateMethods.push(method);
    }

    // addFixUpdateMethods(method: (deltaTime: number) => void) {
    //     this.fixUpdateMethods.push(method);
    // }

    private update() {

        const currentTime = performance.now();
        this.deltaT = (currentTime - this.lastUpdate) / 1000;
        this.lastUpdate = currentTime;
        this.tickCount++;
        this.updateMethods.forEach((method) => method(this.deltaT));
        const rawFPS = 1 / this.deltaT;
        this.FPS = 0.99 * this.FPS + 0.01 * rawFPS; // smooth FPS

        // this.fixDeltaT = (currentTime - this.lastFixUpdate) / 1000;
        // if (this.fixDeltaT > 1) {
        //     console.log("fixDeltaT", this.fixDeltaT);
        //     const rawTPS = 1 / this.fixDeltaT;
        //     this.TPS = 0.9 * this.TPS + 0.1 * rawTPS; // smooth TPS
        //     this.lastFixUpdate = currentTime;
        //     this.fixTickCount++;
        //     this.fixUpdateMethods.forEach((method) =>
        //         method(this.fixDeltaT),
        //     );
        // }

        requestAnimationFrame(this.update.bind(this));
    }
}