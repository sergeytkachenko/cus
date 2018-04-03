const jsDom = require('jsdom');
const { JSDOM } = jsDom;
const path = require('path');
const fs = require('fs');
const testHtml = fs.readFileSync(path.resolve(__dirname, './test.html'));
const DOM = new JSDOM(testHtml);
const assert = require('assert');
const assertion = require('assertion');

const CssFinder = require('../src/css-finder');

describe('CssFinder', function() {
	beforeEach(function() {
		global.Node = { ELEMENT_NODE: 1 };
	});

	describe('generateUniqueSelector', function() {

		it('should return expected id selector', function() {
			let expectEl = DOM.window.document.querySelector('#fizika');
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#fizika');
		});

		it('should return expected class selector', function() {
			let expectEl = DOM.window.document.querySelector('.unique-cls');
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '.unique-cls');
		});

		it('should return expected next(1n) by id selector', function() {
			let expectEl = DOM.window.document.querySelector('#second-el').nextElementSibling;
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, 'span#second-el.sf_title + span.sf_title');
		});

		it('should return expected next(2n) by id selector', function() {
			let expectEl = DOM.window.document.querySelector('#in-center-el').nextElementSibling.nextElementSibling;
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, 'span#in-center-el.sf_title + span.sf_title + span.sf_title');
		});

		it('should return expected first-child', function() {
			let expectEl = DOM.window.document.querySelector('#timezone').children[0];
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#timezone > p:first-child');
		});

		it('should return expected last-child', function() {
			let expectEl = DOM.window.document.querySelector('#timezone').children[2];
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#timezone > p:first-child + p + p:last-child');
		});

		it('should return expected first-child + p', function() {
			let expectEl = DOM.window.document.querySelector('#timezone').children[1];
			const selector = CssFinder.generateUnique(expectEl, DOM.window);
			assert.equal(selector, '#timezone > p:first-child + p');
		});

		it('should expected time', function() {
			const start = Date.now();
			let expectEl = DOM.window.document.querySelector('#timezone').children[2];
			const css = CssFinder.generateUnique(expectEl, DOM.window);
			console.log(css);
			const end = Date.now();
			assertion.lessThan(end - start, 50);
		});
	});
});