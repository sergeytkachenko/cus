class DomElementValidator {

    public static checkIsCorrectElement(sourceElement: Element) {
        if(DomElementValidator.isElement(sourceElement)) {
            throw new IncorrectElementException();
        }
        if(DomElementValidator.isNodeElement(sourceElement)) {
            throw new IncorrectElementException();
        }
    }

    private static isElement(sourceElement: Element): boolean {
        return sourceElement instanceof Element;
    }
    private static isNodeElement(sourceElement: Element): boolean {
        return sourceElement.nodeType === Node.ELEMENT_NODE;
    }
}
