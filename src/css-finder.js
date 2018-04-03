class CssFinder {

	static generateUnique(findEl, win = window) {
		if (!(findEl instanceof win.Element)) {
			return;
		}
		const path = [];
		let el = findEl;
		while (el.nodeType === Node.ELEMENT_NODE) {
			let tagName = el.nodeName.toLowerCase();
			let idCss = CssFinder._getIdSelector(el);
			let classCss = CssFinder._getClassesSelector(el);
			let attributesCss = CssFinder._getAttributesSelector(el);
			let complexCss = `${tagName}${idCss}${classCss}${attributesCss}`;
			if (CssFinder._checkOnlyOneExistEl(idCss, findEl, win)) {
				path.unshift(idCss);
				break;
			}
			if (CssFinder._checkOnlyOneExistEl(classCss, findEl, win)) {
				path.unshift(classCss);
				break;
			}
			if (CssFinder._checkOnlyOneExistEl(attributesCss, findEl, win)) {
				path.unshift(attributesCss);
				break;
			}
			if (CssFinder._checkOnlyOneExistEl(complexCss, findEl, win)) {
				path.unshift(complexCss);
				break;
			}
			if (tagName === 'body') {
				const cssWithPrevEl = CssFinder._generateUniqueByPrev(findEl, win);
				if (cssWithPrevEl) {
					return cssWithPrevEl;
				}
			}
			el = el.parentNode;
		}
		return path.join(" > ");
	}

	static _generateUniqueByPrev(findEl, win) {
		let prevEl = findEl.previousElementSibling;
		const selectors = [];
		while(prevEl && prevEl.nodeType === Node.ELEMENT_NODE) {
			let prevCss = CssFinder._getPrevUnique(prevEl.nextElementSibling, win);
			if (prevCss) {
				selectors.unshift(prevCss);
				return selectors.join(' + ');
			}
			let tagName = prevEl.nodeName.toLowerCase();
			let idCss = CssFinder._getIdSelector(prevEl);
			let classCss = CssFinder._getClassesSelector(prevEl);
			let attributesCss = CssFinder._getAttributesSelector(prevEl);
			const findElCss = idCss || classCss || attributesCss || tagName;
			selectors.unshift(findElCss);
			prevEl = prevEl.previousElementSibling;
		}
		return null;
	}

	static _getPrevUnique(nextEl, win) {
		const prevEl = nextEl.previousElementSibling;
		if (!prevEl || prevEl.nodeType !== Node.ELEMENT_NODE) {
			return null;
		}
		let tagName = nextEl.nodeName.toLowerCase();
		let idCss = CssFinder._getIdSelector(nextEl);
		let classCss = CssFinder._getClassesSelector(nextEl);
		let attributesCss = CssFinder._getAttributesSelector(nextEl);
		const findElCss = idCss || classCss || attributesCss || tagName;
		let prevElCss = CssFinder._generateUnique(prevEl, win);
		let css = `${prevElCss} + ${findElCss}`;
		if (prevElCss && CssFinder._checkOnlyOneExistEl(css, nextEl, win)) {
			return css;
		}
		const complexCss = `${tagName}${idCss}${classCss}${attributesCss}`;
		if (CssFinder._checkOnlyOneExistEl(complexCss, nextEl, win)) {
			return complexCss;
		}
		return null;
	}

	static _generateUnique(findEl, win) {
		if (!(findEl instanceof win.Element)) {
			return;
		}
		const path = [];
		let el = findEl;
		while (el.nodeType === Node.ELEMENT_NODE) {
			let tagName = el.nodeName.toLowerCase();
			let idCss = CssFinder._getIdSelector(el);
			let classCss = CssFinder._getClassesSelector(el);
			let attributesCss = CssFinder._getAttributesSelector(el);
			let complexCss = `${tagName}${idCss}${classCss}${attributesCss}`;
			if (CssFinder._checkOnlyOneExistEl(idCss, findEl, win)) {
				path.unshift(idCss);
				break;
			}
			if (CssFinder._checkOnlyOneExistEl(classCss, findEl, win)) {
				path.unshift(classCss);
				break;
			}
			if (CssFinder._checkOnlyOneExistEl(attributesCss, findEl, win)) {
				path.unshift(attributesCss);
				break;
			}
			if (CssFinder._checkOnlyOneExistEl(complexCss, findEl, win)) {
				path.unshift(complexCss);
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
		let attributes = Array.from(el.attributes)
			.filter(attr => {
				let name = attr.name;
				let value = attr.value;
				if (value === '') {
					return false;
				}
				const nameIsValid = name !== 'class' && name !== 'id' && name !== 'style' && !name.startsWith('on');
				const valueIsValid = parseInt(value).toString() !== value;
				return nameIsValid && valueIsValid;
			});
		if (attributes.length) {
			let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
			return templates.join('');
		}
		return '';
	}

	static _checkOnlyOneExistEl(css, findEl, win) {
		let findEls = css && win.document.querySelectorAll(css);
		return findEls.length === 1 && findEls[0] === findEl;
	}
};

module.exports = CssFinder;
