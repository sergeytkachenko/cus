# Human Dom Inspector

Calculate stable human unique CSS or XPATH selector of the dom element

### API

##### Instance:
```js
const cssHumanInspector = new CssHumanInspector(window);
const xpathHumanInspector = new XpathHumanInspector(window);
```

##### Usage:
```js
const css = cssHumanInspector.calculate(sourceElement);
console.log(css); // like ".common-price", or "#author", "[data-id="cus-067"]"

const xpath = xpathHumanInspector.calculate(sourceElement);
console.log(xpath); // like "//div[contains(@class, 'common-price')]"
```

##### Extended usage:
```js
const findAttributeRules = new FindAttributeRules();
findAttributeRules.excludeAttributeNames = ['data-qa', 'qa', '...'];
findAttributeRules.excludeAttributeValueRegex = [/[0-9]/]; // exclude this if value has number 

const calculateParameters = new CalculateParameters();
calculateParameters.findAttributeRules = findAttributeRules;
calculateParameters.depth = 5;
calculateParameters.rootElement = rootElement;
const css = cssHumanInspector.calculate(sourceElement, calculateParameters);
```
