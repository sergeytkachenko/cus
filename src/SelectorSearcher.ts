import ClassSelector from "./provider/ClassSelector";
import ISelector from "./provider/ISelector";
import ElementSelector from "./provider/ElementSelector";
import AttributeSelector from "./provider/AttributeSelector";
import ChildSelector from "./provider/ChildSelector";
import TagSelector from "./provider/TagSelector";

export default class SelectorSearcher {

    private readonly selectorProviders: Array<ISelector>;

    private readonly ELEMENT_NODE = 1;

    constructor() {
        this.selectorProviders = [
            new ClassSelector(),
            new AttributeSelector(),
            new TagSelector(),
            new ChildSelector()
        ];
    }

    public getUniqueSelector(
        element: Element,
        document: Document,
        maxParentElement: Element = document.body
    ) : string|null {
        this.checkElement(element);
        const parentSelector = this.getParentUniqueSelector(element, document, maxParentElement);
        if (parentSelector === null) {
            return null;
        }
        if (parentSelector.element === element) {
            return parentSelector.selector;
        }
        let currentElement : Element = element;
        const elements : Array<Element> = [element];
        while (currentElement.nodeType === this.ELEMENT_NODE) {
            if (parentSelector.element === currentElement) {
                break;
            }
            currentElement = currentElement.parentNode as HTMLElement;
            elements.unshift(currentElement);
            const selector = elements.join(' > ');
            // todo return with > > > > ...
        }
        return null;
    }

    private getParentUniqueSelector(
        element: Element,
        document: Document,
        maxParentElement: Element
    ) : ElementSelector {
        if (maxParentElement === element) {
            throw new DOMException(`max parent element should not equal target element`);
        }
        let currentElement : Element = element;
        while (currentElement.nodeType === this.ELEMENT_NODE) {
            const selector = this.findUniqueSelectorFromProviders(element, document);
            if (selector) {
                return selector;
            }
            currentElement = currentElement.parentNode as HTMLElement;
            if (maxParentElement === currentElement) {
                return null;
            }
        }
    }

    private checkElement(element: Element) {
        if (element.nodeType === this.ELEMENT_NODE) {
            return;
        }
        throw new DOMException(`not supported dom element: ${element}`);
    }

    private findUniqueSelectorFromProviders(element: Element, document: Document) : ElementSelector {
        let contextSelector = '';
        for (let selectorProvider of this.selectorProviders) {
            const selector = selectorProvider.getUniqueSelector(element, document, contextSelector);
            if (selector && selector.isUnique) {
                return selector;
            }
            contextSelector = selector && selector.selector || contextSelector;
        }
    }
}