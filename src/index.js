import CSSSelector from './css-selector'
import XPathSelector from './xpath-selector'

function _clearFakeValues(str, fakeValues) {
	fakeValues.forEach(val => {
		str = str.replace(val, '');
		str = str.replace('"', '\\"');
	});
	return str;
}

export default {

	generateUniqueSelector(el, win = window, fakeValues = []) {
		const css = CSSSelector.generateUnique(el, win);
		if (!css.startsWith('html')) {
			return _clearFakeValues(css, fakeValues);
		}
		const xpath = XPathSelector.generateUnique(el, win);
		if (!xpath.startsWith('//html')) {
			return _clearFakeValues(xpath, fakeValues);
		}
		return null;
	},


};
