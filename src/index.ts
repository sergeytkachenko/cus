import CssFinder from './CssFinder';
// import XPathFinder from './xpath-finder';

function _clearFakeValues(str: string, fakeValues: Array<any>) {
    fakeValues.forEach(val => {
        str = str.replace(new RegExp(val, 'g'), '');
    });
    return str;
}

export default {
    generateUniqueSelector(el: Element, win = window, fakeValues: Array<any> = []) : string {
        const css = CssFinder.generateUnique(el, win);
        if (css) {
            return _clearFakeValues(css, fakeValues);
        }
        // const xpath = XPathFinder.generateUnique(el, win);
        // if (!xpath.startsWith('//html')) {
        //     return _clearFakeValues(xpath, fakeValues);
        // }
        return null;
    }
}