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
const sourceElement = document.body.lastElementChild;

const findAttributeRules = new FindAttributeRules();
findAttributeRules.excludeAttributeNames = ['data-qa', 'qa', '...'];
findAttributeRules.excludeAttributeValueRegex = [/[0-9]/]; // exclude this if value has number 

const calculateConfig = new CalculateConfig();
calculateConfig.findAttributeRules = findAttributeRules;
calculateConfig.depth = 5;
calculateConfig.rootElement = rootElement;
const css = cssHumanInspector.calculate(sourceElement, calculateConfig);
```
