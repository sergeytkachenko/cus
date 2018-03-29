import CSSSelector from './css-selector'
import XPathSelector from './xpath-selector'

function _clearFakeValues(str) {
	return str.replace('http://elasticdata.io:81/', '');
}

export default {

	generateUniqueSelector(el, win = window) {
		const css = CSSSelector.generateUnique(el, win);
		if (!css.startsWith('html')) {
			return _clearFakeValues(css);
		}
		const xpath = XPathSelector.generateUnique(el, win);
		if (!xpath.startsWith('//html')) {
			return _clearFakeValues(xpath);
		}
		return null;
	},


};
