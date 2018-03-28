import CSSSelector from './css-selector'
import XPathSelector from './xpath-selector'

export default {

	generateSelector(el, win = window) {
		const css = CSSSelector.generate(el, win);
		return css || XPathSelector.generate(el, win);
	}
};
