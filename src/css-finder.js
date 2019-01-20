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
			let childSelector = CssFinder._getChildSelector(el);
			let siblingSelector = CssFinder._getSiblingSelector(el, win);
			let complexCss = `${siblingSelector}${tagName}${idCss}${classCss}${attributesCss}${childSelector}`;
			let localIdCss = CssFinder._concatSelectors(path, idCss);
			if (CssFinder._checkOnlyOneExistEl(localIdCss, findEl, win)) {
				return localIdCss;
			}
			let localClassCss = CssFinder._concatSelectors(path, classCss);
			if (CssFinder._checkOnlyOneExistEl(localClassCss, findEl, win)) {
				return localClassCss;
			}
			let localAttributesCss = CssFinder._concatSelectors(path, attributesCss);
			if (CssFinder._checkOnlyOneExistEl(localAttributesCss, findEl, win)) {
				return localAttributesCss;
			}
			let localComplexCss = CssFinder._concatSelectors(path, complexCss);
			if (CssFinder._checkOnlyOneExistEl(localComplexCss, findEl, win)) {
				return localComplexCss;
			}
			if (tagName === 'body') {
				const cssWithPrevEl = CssFinder._generateUniqueByPrev(findEl, win);
				if (cssWithPrevEl) {
					return cssWithPrevEl;
				}
			}
			path.unshift(complexCss);
			el = el.parentNode;
		}
		return path.join(" > ");
	}

	static _concatSelectors(path, css) {
		let pathCss = path.join(" > ");
		if (pathCss && css) {
			return `${css} > ${pathCss}`;
		}
		return css;
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
		if (el.className && el.className.trim) {
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
				return nameIsValid && valueIsValid && name !== 'href';
			});
		if (attributes.length) {
			let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
			return templates.join('');
		}
		return '';
	}

	static _getChildSelector(el) {
		let prevEl = el.previousElementSibling;
		const nextEl = el.nextElementSibling;
		if (!prevEl || prevEl.nodeType !== Node.ELEMENT_NODE) {
			return ':first-child';
		}
		if (!nextEl || nextEl.nodeType !== Node.ELEMENT_NODE) {
			return ':last-child';
		}
		return '';
	}

	static _getSiblingSelector(el, win) {
		const selectors = [];
		let prevEl = el.previousElementSibling;
		while(prevEl && prevEl.nodeType === Node.ELEMENT_NODE) {
			let tagName = prevEl.nodeName.toLowerCase();
			let idCss = CssFinder._getIdSelector(prevEl);
			let classCss = CssFinder._getClassesSelector(prevEl);
			let attributesCss = CssFinder._getAttributesSelector(prevEl);
			let childSelector = CssFinder._getChildSelector(prevEl);
			let complexCss = `${tagName}${idCss}${classCss}${attributesCss}${childSelector}`;
			selectors.unshift(complexCss);
			let css = selectors.join(' + ');
			if (CssFinder._isOnlyOneExistEl(css, win)) {
				return `${css} + `;
			}
			prevEl = prevEl.previousElementSibling;
		}
		return selectors.length ? `${selectors.join(' + ')} + ` : '';
	}

	static _checkOnlyOneExistEl(css, findEl, win) {
		let findEls = [];
		try {
			findEls = css && win.document.querySelectorAll(css);
		} catch (e) {}
		return findEls.length === 1 && findEls[0] === findEl;
	}

	static _isOnlyOneExistEl(css, win) {
		let findEls = [];
		try {
			findEls = css && win.document.querySelectorAll(css);
		} catch (e) {}
		return findEls.length === 1;
	}
};

module.exports = CssFinder;
