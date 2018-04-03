const CssFinder = require('./css-finder');
const XPathFinder = require('./xpath-finder');

function _clearFakeValues(str, fakeValues) {
	fakeValues.forEach(val => {
		str = str.replace(new RegExp(val, 'g'), '');
	});
	return str;
}

module.exports = {

	generateUniqueSelector(el, win = window, fakeValues = []) {
		let css = CssFinder.generateUnique(el, win);
		if (css) {
			css = _clearFakeValues(css, fakeValues);
			let element = win.document.querySelector(css);
			if (element && element.tagName === 'BODY') {
				return null;
			}
			return css;
		}
		let xpath = XPathFinder.generateUnique(el, win);
		if (!xpath.startsWith('//html')) {
			xpath = _clearFakeValues(xpath, fakeValues);
			const element = win.document.evaluate(xpath, win.document, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (element && element.tagName === 'BODY') {
				return null;
			}
			return xpath;
		}
		return null;
	}

};
