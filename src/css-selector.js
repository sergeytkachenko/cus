class CSSSelector {

	static generateCSS(el, win = window) {
		if (!(el instanceof win.Element)) return;
		const path = [];
		while (el.nodeType === Node.ELEMENT_NODE) {
			let tagName = el.nodeName.toLowerCase();
			let classSelector = CSSSelector._getClassesSelector(el);
			let idSelector = CSSSelector._getIdSelector(el);
			let attributesSelector = CSSSelector._getAttributesSelector(el);
			path.unshift(`${tagName}${idSelector}${classSelector}${attributesSelector}`);
			let css = path.join(" > ");
			if (path.length && win.document.querySelectorAll(css).length === 1) {
				break;
			}
			el = el.parentNode;
		}
		return path.join(" > ");
	}

	static _getIdSelector(el) {
		if (el.id) {
			return `#${el.id}`
		}
		return '';
	}

	static _getClassesSelector(el) {
		if (el.className) {
			let classes = el.className.trim().replace(/\s+/g, ".");
			return `.${classes}`
		}
		return '';
	}

	static _getAttributesSelector(el) {
		let attributes = Array.from(el.attributes).filter(attr => {
			let name = attr.name;
			return name !== 'class' && name !== 'id' && name !== 'style';
		});
		if (attributes.length) {
			let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
			return templates.join('');
		}
		return '';
	}
};

export default CSSSelector;
