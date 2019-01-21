import ISelector from './ISelector';
import AbstractSelector from "./AbstractSelector";
import ElementSelector from "./ElementSelector";

export default class TagSelector extends AbstractSelector implements ISelector {

    getUniqueSelector(element: Element, document: Document, contextSelector: string = ''): ElementSelector {
        const tag = element.tagName.toLowerCase();
        const selector = `${tag}${contextSelector}`;
        return {
            selector: selector,
            isUnique: AbstractSelector.selectorIsUnique(selector, document, element),
            element: element
        } as ElementSelector;
    }
}