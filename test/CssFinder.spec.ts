import {JSDOM} from 'jsdom';
import * as path from 'path';
import * as fs from 'fs';
const testHtml = fs.readFileSync(path.resolve(__dirname, './test.html'));
const DOM = new JSDOM(testHtml);
import * as assert from 'assert';
import * as assertion from 'assertion';
import CssFinder from '../src/index';

describe('CssFinder', function () {
    beforeEach(function () {
        //global.Node = {ELEMENT_NODE: 1};
    });

    describe('generateUniqueSelector', () => {

        it('should return expected id selector', function () {
            let expectEl = DOM.window.document.querySelector('#fizika');
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, '#fizika');
        });

        it('should return expected class selector', function () {
            let expectEl = DOM.window.document.querySelector('.unique-cls');
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, '.unique-cls');
        });

        it('should return expected next(1n) by id selector', function () {
            let expectEl = DOM.window.document.querySelector('#second-el').nextElementSibling;
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, 'span#second-el.sf_title + span.sf_title');
        });

        it('should return expected next(2n) by id selector', function () {
            let expectEl = DOM.window.document.querySelector('#in-center-el').nextElementSibling.nextElementSibling;
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, 'span#in-center-el.sf_title + span.sf_title + span.sf_title');
        });

        it('should return expected first-child', function () {
            let expectEl = DOM.window.document.querySelector('#timezone > p:first-child');
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, '#timezone > p:first-child');
        });

        it('should return expected last-child', function () {
            let expectEl = DOM.window.document.querySelector('#timezone').children[2];
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, '#timezone > p:first-child + p + p:last-child');
        });

        it('should return expected first-child + p', function () {
            let expectEl = DOM.window.document.querySelector('#timezone').children[1];
            const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            assert.strictEqual(selector, '#timezone > p:first-child + p');
        });

        describe("when id has numbers", () => {
            it('should not return id selector', function () {
                let expectEl = DOM.window.document.querySelector('#not-unique-123');
                const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
                assert.notStrictEqual(selector, 'div#not-unique-123');
                assert.strictEqual(selector, 'div#bn-bot-wrap + div.id-with-numbers');
            });
        });

        describe("when class has numbers", () => {
            it('should return expected selector', function () {
                let expectEl = DOM.window.document.querySelector('#not-unique-124');
                const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
                assert.strictEqual(selector, '#bn-bot-wrap + .id-with-numbers + .id-with-numbers');
            });
        });

        describe("when attribute value has numbers", () => {
            it('should return expected selector', function () {
                let expectEl = DOM.window.document.querySelector('#not-unique-125');
                const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
                assert.strictEqual(selector, '[data-cls="not-unique"]');
            });
        });

        describe("when attribute name has numbers", () => {
            it('should return expected selector', function () {
                let expectEl = DOM.window.document.querySelector('#not-unique-126');
                const selector = CssFinder.generateUniqueSelector(expectEl, DOM.window);
                assert.strictEqual(selector, '[data-cls="not-unique-two"]');
            });
        });

        it('should expected time', function () {
            const start = Date.now();
            let expectEl = DOM.window.document.querySelector('#timezone').children[2];
            const css = CssFinder.generateUniqueSelector(expectEl, DOM.window);
            console.log(css);
            const end = Date.now();
            assertion.lessThan(end - start, 50);
        });
    });
});