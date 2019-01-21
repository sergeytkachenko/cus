import ISelector from './ISelector';
import AbstractSelector from "./AbstractSelector";
import ElementSelector from "./ElementSelector";

export default class ChildSelector extends AbstractSelector implements ISelector {

    getUniqueSelector(element: Element, document: Document, contextSelector: string = ''): ElementSelector {
        let prevEl = element.previousElementSibling;
        const nextEl = element.nextElementSibling;
        let selector;
        if (!prevEl || prevEl.nodeType !== this.ELEMENT_NODE) {
            selector =  `${contextSelector}:first-child`;
        }
        if (!nextEl || nextEl.nodeType !== this.ELEMENT_NODE) {
            selector = `${contextSelector}:last-child`;
        }
        return {
            selector: selector,
            isUnique: AbstractSelector.selectorIsUnique(selector, document, element),
            element: element
        } as ElementSelector;
    }
}