abstract class HumanInspector {
    calculateConfig: CalculateConfig;
    win: Window;

    constructor(window: Window) {
        this.win = window;
    }

    calculate(sourceElement: Element, calculateConfig?: CalculateConfig) : string {
        this.setCalculateConfig(calculateConfig);
        DomElementValidator.checkIsCorrectElement(sourceElement);
        return '';
    };

    private setCalculateConfig(calculateConfig: CalculateConfig) {
        if (!calculateConfig) {
            calculateConfig = new DefaultCalculateConfig();
        }
        this.calculateConfig = calculateConfig;
    }

    abstract checkOnlyOneElementExists(selector: string): boolean;
}
