const jsDom = require('jsdom');
const { JSDOM } = jsDom;
const path = require('path');
const fs = require('fs');
const testHtml = fs.readFileSync(path.resolve(__dirname, './test.html'));
const dom = new JSDOM(testHtml);
const assert = require('assert');

const FlatDecorator = require('../flat-decorator');
const flatDecorator = new FlatDecorator;

describe('FlatDecorator', function() {

	describe('decorate', function() {
		const flatDom = flatDecorator.decorate(dom.window);

		it('should return expected flat object keys', function() {
			assert.equal(Object.values(flatDom).length, 13243);
		});
	});
});