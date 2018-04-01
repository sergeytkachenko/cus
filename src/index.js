const CssFinder = require('./css-finder');
const XPathFinder = require('./xpath-finder');

function _clearFakeValues(str, fakeValues) {
	fakeValues.forEach(val => {
		str = str.replace(val, '');
	});
	return str;
}

module.exports = {

	generateUniqueSelector(el, win = window, fakeValues = []) {
		const css = (new CssFinder).generateUnique(el, win);
		if (css) {
			return _clearFakeValues(css, fakeValues);
		}
		const xpath = XPathFinder.generateUnique(el, win);
		if (!xpath.startsWith('//html')) {
			return _clearFakeValues(xpath, fakeValues);
		}
		return null;
	}

};
