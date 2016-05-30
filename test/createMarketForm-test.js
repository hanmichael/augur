import {assert} from 'chai';

const selectorsLocation =
process.env.selectors ? process.env.selectors : '../src/selectors';
let selectors = require(selectorsLocation);
process.env.selectors ? selectors = selectors.default : selectors;

describe(`Selector shape tests. Selector...`, () => {
	if (selectors.createMarketForm) {
	  // createMarketForm: {}
		it(`should contain a createMarketForm Object`, () => {
			let actual = selectors.createMarketForm;
			assert.isDefined(actual, `createMarketForm isn't defined`);
			assert.isObject(actual, `createMarketForm isn't an object`);
		});
	} else {
		console.log(`
- selectors.createMarketForm isn't defined.
	- skipping createMarketForm tests.`);
	}
});
