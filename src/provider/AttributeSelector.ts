import ISelector from './ISelector';
import AbstractSelector from "./AbstractSelector";
import ElementSelector from "./ElementSelector";

export default class AttributeSelector extends AbstractSelector implements ISelector {

    getUniqueSelector(element: Element, document: Document, contextSelector: string = ''): ElementSelector {
        let attributes = Array.from(element.attributes)
            .filter(attr => {
                let attrName = attr.name;
                let attrValue = attr.value;
                if (attrValue === '' || attrName === '') {
                    return false;
                }
                const nameIsValid = attrName !== 'class'
                    && attrName !== 'id'
                    && attrName !== 'style'
                    && !attrName.startsWith('on');
                const valueIsValid = parseInt(attrValue).toString() !== attrValue;
                return nameIsValid && valueIsValid && attrName !== 'href';
            });
        if (attributes.length) {
            let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
            const selector = `${contextSelector}${templates.join('')}`;
            return {
                selector: selector,
                isUnique: AbstractSelector.selectorIsUnique(selector, document, element),
                element: element
            } as ElementSelector;
        }
        return null;
    }
}