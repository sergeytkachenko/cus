export default abstract class AbstractSelector {

    protected readonly ELEMENT_NODE = 1;

    protected static selectorIsUnique(selector: string, document: Document, element: Element) : boolean {
        let elements;
        try {
            elements = document.querySelectorAll(selector);
            return elements && elements.length === 1 && element === elements[0];
        } catch (e) {
            return false;
        }
    }
}