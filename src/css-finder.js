class CssFinder {

	generateUnique(findEl, win = window) {
		if (!(findEl instanceof win.Element) || findEl.tagName === 'BODY') {
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
			if (tagName === 'body') {
				let prevElCss = this.generateUnique(el.previousElementSibling, win);
				if (prevElCss) {
					const findElCss = idCss || classCss || attributesCss || tagName;
					let css = `${prevElCss} + ${findElCss}`;
					if (CssFinder._checkOnlyOneExistEl(css, findEl, win)) {
						return css;
					}
					css = `${prevElCss} + ${complexCss}`;
					if (CssFinder._checkOnlyOneExistEl(css, findEl, win)) {
						return css;
					}
				}
				return null;
			}
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
