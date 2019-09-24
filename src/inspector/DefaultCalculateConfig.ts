class DefaultCalculateConfig extends CalculateConfig {
    constructor() {
        super();
        this.findAttributeRules = new FindAttributeRules();
        this.depth = 10;
        this.rootElement = null;
    }
}
