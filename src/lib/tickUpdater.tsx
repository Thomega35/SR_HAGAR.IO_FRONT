export class TickUpdater {
    private lastUpdate = performance.now();
    private deltaT = 1;
    private updateMethods: Array<(deltaTime: number) => void> = [];

    start() {
        this.lastUpdate = performance.now();
        this.deltaT = 1;

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
        this.updateMethods.forEach((method) => method(this.deltaT));

        requestAnimationFrame(this.update.bind(this));
    }
}