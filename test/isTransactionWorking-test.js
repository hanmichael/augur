import {assert} from 'chai';

const selectorsLocation =
process.env.selectors ? process.env.selectors : '../src/selectors';
let selectors = require(selectorsLocation);
process.env.selectors ? selectors = selectors.default : selectors;

describe(`selectors.isTransactionsWorking tests:`, () => {
	if (selectors.isTransactionsWorking !== undefined) {
		// isTransactionsWorking: Boolean,
		it(`should contain a isTransactionsWorking boolean`, () => {
			let actual = selectors.isTransactionsWorking;
			assert.isDefined(actual, `isTransactionsWorking isn't defined`);
			assert.isBoolean(actual, `isTransactionsWorking isn't a boolean`);
		});
	} else {
		console.log(`
- selectors.isTransactionsWorking isn't defined.
	- skipping isTransactionsWorking tests.`);
	}
});
