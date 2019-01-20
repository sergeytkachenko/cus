class XPathFinder {

	static generateUnique(el, win = window) {
		if (!(el instanceof win.Element) || el.tagName === 'BODY') {
			return;
		}
		const path = [];
		while (el.nodeType === Node.ELEMENT_NODE && el.tagName !== 'BODY') {
			let tagName = el.nodeName.toLowerCase();
			let attributesSelector = XPathFinder._getAttributesSelector(el);
			let textSelector = XPathFinder._getTextSelector(el);
			path.unshift(`${tagName}${attributesSelector}${textSelector}`);
			let xpath = `//${path.join("/")}`;
			const element = win.document.evaluate(xpath, win.document, null,
				XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
			if (path.length && element === el) {
				break;
			}
			el = el.parentNode;
		}
		return `//${path.join("/")}`;
	}

	static _getAttributesSelector(el) {
		let attributes = Array.from(el.attributes).filter(attr => {
			let name = attr.name;
			return name !== 'style' && name !== 'href';
		});
		if (attributes.length) {
			let templates = attributes.map(attr => `[@${attr.name}="${attr.value}"]`);
			return templates.join('');
		}
		return '';
	}

	static _getTextSelector(el) {
		const text = el.outerText;
		if (!text) {
			return null;
		}
		const replaceSymbols = /['\)\(,\[\]]/g;
		const contains = text.slice(0, 50);
		const str = contains.replace(replaceSymbols, '\\$1');
		return `[contains(text(), '${str}')]`;
	}
};

export default XPathFinder;