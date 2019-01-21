import ISelector from './ISelector';
import AbstractSelector from "./AbstractSelector";
import ElementSelector from "./ElementSelector";

export default class ClassSelector extends AbstractSelector implements ISelector {

    getUniqueSelector(element: Element, document: Document, contextSelector: string = ''): ElementSelector {
        const classes = Object.values(element.classList)
            .map(className => {
                className = className.trim();
                return className;
            })
            .filter(className => Boolean(className))
            .map(className => `.${className}`);
        const selector = `${contextSelector}${classes.join('')}`;
        return {
            selector: selector,
            isUnique: AbstractSelector.selectorIsUnique(selector, document, element),
            element: element
        } as ElementSelector;
    }
}