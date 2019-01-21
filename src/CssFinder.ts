class CssFinder {

    static generateUnique(findEl: Element, win: any = window) {
        if (!(findEl instanceof win.Element)) {
            return;
        }
        const path = [];
        let el = findEl;
        while (el.nodeType === win.Node.ELEMENT_NODE) {
            let tagName = el.nodeName.toLowerCase();
            let idCss = CssFinder._getIdSelector(el);
            let classCss = CssFinder._getClassesSelector(el);
            let attributesCss = CssFinder._getAttributesSelector(el);
            let childSelector = CssFinder._getChildSelector(el, win);
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
            el = el.parentNode as HTMLElement;
        }
        return path.join(" > ");
    }

    static _concatSelectors(path: Array<string>, css: string) {
        let pathCss = path.join(" > ");
        if (pathCss && css) {
            return `${css} > ${pathCss}`;
        }
        return css;
    }

    static _generateUniqueByPrev(findEl: Element, win: any) {
        let prevEl = findEl.previousElementSibling;
        const selectors = [];
        while(prevEl && prevEl.nodeType === win.Node.ELEMENT_NODE) {
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

    static _getPrevUnique(nextEl: Element, win: any) {
        const prevEl = nextEl.previousElementSibling;
        if (!prevEl || prevEl.nodeType !== win.Node.ELEMENT_NODE) {
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

    static _generateUnique(findEl: Element, win: any) {
        if (!(findEl instanceof win.Element)) {
            return;
        }
        const path = [];
        let el = findEl;
        while (el.nodeType === win.Node.ELEMENT_NODE) {
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
            el = el.parentNode as Element;
        }
        return path.join(" > ");
    }

    static _getIdSelector(el: Element) {
        const selector = CssFinder._trustedSelector(el.id);
        if (selector) {
            return `#${selector}`
        }
        return '';
    }

    static _getClassesSelector(el: Element) {
        const classes = Object.values(el.classList)
            .map(className => {
                className = className.trim();
                className = CssFinder._trustedSelector(className);
                return className;
            })
            .filter(className => Boolean(className));
        return `.${classes.join('.')}`;
    }

    static _getAttributesSelector(el: Element) {
        let attributes = Array.from(el.attributes)
            .filter(attr => {
                let attrName = attr.name;
                let attrValue = attr.value;
                attrValue = CssFinder._trustedSelector(attrValue);
                attrName = CssFinder._trustedSelector(attrName);
                if (attrValue === '' || attrName === '') {
                    return false;
                }
                const nameIsValid = attrName !== 'class'
                    && attrName !== 'id'
                    && attrName !== 'style'
                    && !attrName.startsWith('on');
                const valueIsValid = parseInt(attrValue).toString() !== attrValue;
                return nameIsValid && valueIsValid && attrName !== 'href';
            });
        if (attributes.length) {
            let templates = attributes.map(attr => `[${attr.name}="${attr.value}"]`);
            return templates.join('');
        }
        return '';
    }

    static _getChildSelector(el: Element, win: any) {
        let prevEl = el.previousElementSibling;
        const nextEl = el.nextElementSibling;
        if (!prevEl || prevEl.nodeType !== win.Node.ELEMENT_NODE) {
            return ':first-child';
        }
        if (!nextEl || nextEl.nodeType !== win.Node.ELEMENT_NODE) {
            return ':last-child';
        }
        return '';
    }

    static _getSiblingSelector(el: Element, win: any) {
        const selectors = [];
        let prevEl = el.previousElementSibling;
        while(prevEl && prevEl.nodeType === win.Node.ELEMENT_NODE) {
            let tagName = prevEl.nodeName.toLowerCase();
            let idCss = CssFinder._getIdSelector(prevEl);
            let classCss = CssFinder._getClassesSelector(prevEl);
            let attributesCss = CssFinder._getAttributesSelector(prevEl);
            let childSelector = CssFinder._getChildSelector(prevEl, win);
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

    static _checkOnlyOneExistEl(css: string, findEl: Element, win: any) {
        let findEls = [];
        try {
            findEls = css && win.document.querySelectorAll(css);
        } catch (e) {}
        return findEls.length === 1 && findEls[0] === findEl;
    }

    static _isOnlyOneExistEl(css: string, win: any) {
        let findEls = [];
        try {
            findEls = css && win.document.querySelectorAll(css);
        } catch (e) {}
        return findEls.length === 1;
    }

    static _isTrustedSelector(selector: string) {
        const hasNumber = /[0-9]{3,}/.test(selector);
        return !hasNumber;
    }

    static _trustedSelector(selector: string) {
        if (CssFinder._isTrustedSelector(selector)) {
            return selector;
        }
        return '';
    }
}

export default CssFinder;
