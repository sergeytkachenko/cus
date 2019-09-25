class ElementSelectorManager {

    findAttributeRules: FindAttributeRules;

    getElementTagName(sourceElement: Element) : string {
        return sourceElement.nodeName.toLowerCase();
    }

    getIdSelector(sourceElement: Element) : string {
        const id = sourceElement.id;
        if (id === null || id === undefined) {
            return null;
        }
        if (this.findAttributeRules.isValidAttribute('id', id)) {
            return id;
        }
        return null;
    }

    getClassesSelector(sourceElement: Element) : string {
        const classes = Object.values(sourceElement.classList)
            .map(className => {
                className = className.trim();
                return className;
            })
            .filter(className => Boolean(className))
            .filter(className => {
                this.findAttributeRules.isValidAttribute('class', className);
            })
            .map(className => `.${className}`);
        return classes.join('');
    }

    getAttributesSelector(sourceElement: Element) : string {
        let attributes = Array.from(sourceElement.attributes)
            .filter(attr => {
                return this.findAttributeRules.isValidAttribute(attr.name, attr.value);
            });
        if (attributes.length) {
            let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
            return templates.join('');
        }
        return '';
    }
}
