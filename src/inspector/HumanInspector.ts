abstract class HumanInspector {
    win: Window;
    constructor(window: Window) {
        this.win = window;
    }
    abstract calculate(sourceElement: Element) : string;

    protected isElement(sourceElement: Element): boolean {
        return sourceElement instanceof Element;
    }
    protected isNodeElement(sourceElement: Element): boolean {
        return sourceElement.nodeType === Node.ELEMENT_NODE;
    }
}
