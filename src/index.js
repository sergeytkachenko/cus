import CSSSelector from './css-selector'
import XPathSelector from './xpath-selector'

export default {

	generateUniqueSelector(el, win = window) {
		const css = CSSSelector.generateUnique(el, win);
		if (!css.startsWith('html')) {
			return css;
		}
		const xpath = XPathSelector.generateUnique(el, win);
		if (!xpath.startsWith('//html')) {
			return xpath;
		}
		return null;
	}
};
