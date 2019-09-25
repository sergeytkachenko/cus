class FindAttributeRules {
    excludeAttributeNames: string[] = [];
    excludeAttributeValueRegex: RegExp[] = [];

    ignoreAttributes: string[] = ['class', 'id', 'style', 'on', 'href'];

    ignoredAttribute(attributeName: string): boolean {
        return Boolean(this.ignoreAttributes.find(i => attributeName.startsWith(i)));
    }

    public isValidAttribute(attributeName: string, attributeValue: string) {
        if (attributeName === '' || attributeValue === '') {
            return false;
        }
        const excludeByName = this.excludeAttributeNames.find(x => {
            return x.toLowerCase() === attributeName.toLowerCase();
        });
        const excludeByValue = this.excludeAttributeValueRegex.find(x => {
            return x.test(attributeValue);
        });
        const ignoredAttribute = this.ignoredAttribute(attributeName);
        return excludeByName === undefined && excludeByValue === undefined && ignoredAttribute === false;
    }
}
