import FlatDecorator from './flat-decorator';

export default {

	create(win) {
		const flatDecorator = new FlatDecorator;
		const flatDom = flatDecorator.decorate(win);
		return flatDom;
	}
}