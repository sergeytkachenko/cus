const jsDom = require('jsdom');
const { JSDOM } = jsDom;
const path = require('path');
const fs = require('fs');
const testHtml = fs.readFileSync(path.resolve(__dirname, './test.html'));
const DOM = new JSDOM(testHtml);
const assert = require('assert');

const CssFinder = require('../src/css-finder');

describe('CssFinder', function() {
	beforeEach(function() {
		global.Node = { ELEMENT_NODE: 1 };
	});

	describe('generateUniqueSelector', function() {

		it('should return expected id selector', function() {
			let expectEl = DOM.window.document.querySelector('#fizika');
			const cssFinder = new CssFinder();
			const selector = cssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#fizika');
		});

		it('should return expected class selector', function() {
			let expectEl = DOM.window.document.querySelector('.unique-cls');
			const cssFinder = new CssFinder();
			const selector = cssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '.unique-cls');
		});

		it('should return expected next(1n) by id selector', function() {
			let expectEl = DOM.window.document.querySelector('#second-el').nextElementSibling;
			const cssFinder = new CssFinder();
			const selector = cssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#second-el + .sf_title');
		});

		it('should return expected next(2n) by id selector', function() {
			let expectEl = DOM.window.document.querySelector('#in-center-el').nextElementSibling.nextElementSibling;
			const cssFinder = new CssFinder();
			const selector = cssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#in-center-el + .sf_title + .sf_title');
		});
	});
});