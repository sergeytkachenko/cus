const flatten = require('flat');

class FlatDecorator {

	decorate(win) {
		const elements = this._decorateEl(win.document.body);
		return this.flatten(elements);
	}

	flatten(obj) {
		return flatten(obj);
	}

	_decorateEl(element) {
		const elements = [];
		for (let i = 0; i < element.children.length; i++) {
			const el = element.children[i];
			const tagName = el.tagName.toLowerCase();
			elements.push({
				tagName: tagName,
				attributes: this._getAttributes(el),
				text: el.innerText || ''
			});
		}
		return elements;
	}

	_getAttributes(el) {
		const attributes = {};
		for (let i = 0; i < el.attributes.length; i++) {
			const attribute = el.attributes[i];
			attributes[attribute.name] = attribute.value;
		}
		return attributes;
	}
}

module.exports = FlatDecorator;
