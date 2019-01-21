import ElementSelector from "./ElementSelector";

export default interface ISelector {
    getUniqueSelector(element: Element, document: Document, contextSelector: string) : ElementSelector;
}