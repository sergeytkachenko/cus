import Cus from "cus";

class CSSSelector {

	static generateUnique(el, win = window) {
		if (!(el instanceof win.Element) || el.tagName === 'BODY') {
			return;
		}
		const path = [];
		CSSSelector._originEl = el;
		while (el.nodeType === Node.ELEMENT_NODE || el.tagName !== 'BODY') {
			let tagName = el.nodeName.toLowerCase();
			let classSelector = CSSSelector._getClassesSelector(el);
			let idSelector = CSSSelector._getIdSelector(el);
			let attributesSelector = CSSSelector._getAttributesSelector(el);
			let elSelector = `${tagName}${idSelector}${classSelector}${attributesSelector}`;
			path.unshift(elSelector);
			let css = path.join(" > ");
			let findEls = path.length && win.document.querySelectorAll(css);
			if (findEls.length === 1 && findEls[0] === CSSSelector._originEl) {
				break;
			}
			let withPrevElSelector = CSSSelector._getWithPrevEl(el,  win);
			findEls = win.document.querySelectorAll(withPrevElSelector);
			if (findEls.length === 1 && findEls[0] === CSSSelector._originEl) {
				return withPrevElSelector;
			}
			el = el.parentNode;
		}
		return path.join(" > ");
	}

	static _generateUniqueWithoutPrevEl(el, win) {
		if (!(el instanceof win.Element)) return;
		const path = [];
		while (el.nodeType === Node.ELEMENT_NODE) {
			let tagName = el.nodeName.toLowerCase();
			let classSelector = CSSSelector._getClassesSelector(el);
			let idSelector = CSSSelector._getIdSelector(el);
			let attributesSelector = CSSSelector._getAttributesSelector(el);
			let elSelector = `${tagName}${idSelector}${classSelector}${attributesSelector}`;
			path.unshift(elSelector);
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
			let value = attr.value;
			if (value === '') {
				return false;
			}
			return name !== 'class' && name !== 'id' && name !== 'style' && !name.startsWith('on');
		});
		if (attributes.length) {
			let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
			return templates.join('');
		}
		return '';
	}

	static _getWithPrevEl(el, win) {
		const prevEl = el.previousElementSibling;
		if (!prevEl || prevEl.nodeType !== Node.ELEMENT_NODE) {
			return null;
		}
		const prevElSelector = CSSSelector._generateUniqueWithoutPrevEl(prevEl, win);
		if (prevElSelector.startsWith('html')) {
			return null;
		}
		let tagName = el.nodeName.toLowerCase();
		let classSelector = CSSSelector._getClassesSelector(el);
		let idSelector = CSSSelector._getIdSelector(el);
		let attributesSelector = CSSSelector._getAttributesSelector(el);
		let elSelector = `${tagName}${idSelector}${classSelector}${attributesSelector}`;
		return `${prevElSelector} + ${elSelector}`;
	}
};

export default CSSSelector;
