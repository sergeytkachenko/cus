const jsDom = require('jsdom');
const { JSDOM } = jsDom;
const path = require('path');
const fs = require('fs');
const testHtml = fs.readFileSync(path.resolve(__dirname, './test.html'));
const dom = new JSDOM(testHtml);
const assert = require('assert');

const DomDecorator = require('../dom-decorator');
const flatDecorator = new DomDecorator;

describe('DomDecorator', function() {

	describe('decorate', function() {
		console.time("flat");
		const domInspector = flatDecorator.decorate(dom.window);
		console.timeEnd("flat");
		const keys = Object.keys(domInspector);

		it('should return expected flat object keys', function() {
			assert.equal(Object.values(domInspector).length, 16534);
		});

		it('should return expected flat object value by tmp-index', function() {
			const key = keys.find(key => {
				const value = domInspector[key];
				return key.endsWith('tmp-index') && value === '1000';
			});
			assert.equal(key, '4.elements.0.elements.1.elements.0.elements.0.elements.0.elements.1.elements.0' +
				'.elements.1.elements.1.elements.0.elements.0.elements.0.elements.0.elements.5.elements.1' +
				'.elements.0.elements.3.elements.1.elements.1.elements.1.attributes.tmp-index');
		});

		describe('getElement', function() {
			assert.equal(Object.values(domInspector).length, 16534);
		});
	});
});