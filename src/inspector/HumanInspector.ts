abstract class HumanInspector {
    win: Window;
    constructor(window: Window) {
        this.win = window;
    }
    abstract calculate(sourceElement: Element) : string;
}
