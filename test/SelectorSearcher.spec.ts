import {JSDOM} from 'jsdom';
import * as path from 'path';
import * as fs from 'fs';
const testHtml = fs.readFileSync(path.resolve(__dirname, './test.html'));
const DOM = new JSDOM(testHtml);
import SelectorSearcher from '../src/SelectorSearcher';
import * as assert from "assert";

describe('SelectorSearcher', function () {
    describe('getUniqueSelector', () => {
        it('should return expected id selector', function () {
            const ss = new SelectorSearcher();
            let expectEl = DOM.window.document.querySelector('#fizika');
            const selector = ss.getUniqueSelector(expectEl, DOM.window.document, DOM.window.document.body);
            assert.strictEqual(selector, '#fizika');
        });
    });
});