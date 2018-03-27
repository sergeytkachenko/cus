export default {

	generateCSS(el, win = window) {
		if (!(el instanceof win.Element)) return;
		const path = [];
		while (el.nodeType === Node.ELEMENT_NODE) {
			let selector = el.nodeName.toLowerCase();
			if (el.id){
				path.unshift('#'+el.id);
			} else if (el.className){
				path.unshift('.' + el.className.trim().replace(/\s+/g, "."));
			} else {
				let sib = el, nth = 1;
				while (sib = sib.previousElementSibling) {
					if (sib.nodeName.toLowerCase() === selector)
						nth++;
				}
				if (nth !== 1)
					selector += ":nth-of-type("+nth+")";
			}
			path.unshift(selector);
			let css = path.join(" > ");
			if (path.length && win.document.querySelectorAll(css).length === 1) {
				break;
			}
			el = el.parentNode;
		}
		return path.join(" > ");
	}
};