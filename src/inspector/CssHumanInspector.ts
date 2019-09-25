class CssHumanInspector extends HumanInspector {
    calculate(sourceElement: Element): string {
        return "";
    }

    checkOnlyOneElementExists(selector: string): boolean {
        try {
            const findEls = this.win.document.querySelectorAll(selector);
            return findEls.length === 1;
        } catch (e) {}
        return false;
    }
}
