class XPathSelector {

	static generate(el, win = window) {
		if (!(el instanceof win.Element)) return;
		const path = [];
		while (el.nodeType === Node.ELEMENT_NODE) {
			let tagName = el.nodeName.toLowerCase();
			let attributesSelector = XPathSelector._getAttributesSelector(el);
			path.unshift(`${tagName}${attributesSelector}`);
			let xpath = `//${path.join("/")}`;
			const elements = win.document.evaluate(xpath, win.document, null,
				XPathResult.ORDERED_NODE_ITERATOR_TYPE, null);
			if (path.length && elements.length === 1) {
				break;
			}
			el = el.parentNode;
		}
		return `//${path.join("/")}`;
	}

	static _getAttributesSelector(el) {
		let attributes = Array.from(el.attributes).filter(attr => {
			let name = attr.name;
			return name !== 'style';
		});
		if (attributes.length) {
			let templates = attributes.map(attr => `[@${attr.name}="${attr.value}"]`);
			return templates.join('');
		}
		return '';
	}
};

export default XPathSelector;
