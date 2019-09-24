class FindAttributeRules {
    excludeAttributeNames: string[] = [];
    excludeAttributeValueRegex: RegExp[] = [];

    public isValidAttribute(attributeName: string, attributeValue: string) {
        const excludeByName = this.excludeAttributeNames.find(x => {
            return x.toLowerCase() === attributeName.toLowerCase();
        });
        const excludeByValue = this.excludeAttributeValueRegex.find(x => {
            return x.test(attributeValue);
        });
        return excludeByName === undefined && excludeByValue === undefined;
    }
}
