export class TimeManager {
    private lastUpdate = performance.now();
    private tickCount = 0;
    private deltaT = 1;
    private updateMethods: Array<(deltaTime: number) => void> = [];

    FPS = 0;
    TPS = 0;

    start() {
        this.lastUpdate = performance.now();
        this.tickCount = 0;
        this.deltaT = 1;

        this.FPS = 0;
        this.TPS = 0;

        requestAnimationFrame(this.update.bind(this));
    }

    stop() {
        this.updateMethods = [];
    }

    addUpdateMethods(method: (deltaTime: number) => void) {
        this.updateMethods.push(method);
    }

    private update() {

        const currentTime = performance.now();
        this.deltaT = (currentTime - this.lastUpdate) / 1000;
        this.lastUpdate = currentTime;
        this.tickCount++;
        this.updateMethods.forEach((method) => method(this.deltaT));
        const rawFPS = 1 / this.deltaT;
        this.FPS = 0.99 * this.FPS + 0.01 * rawFPS; // smooth FPS

        requestAnimationFrame(this.update.bind(this));
    }
}