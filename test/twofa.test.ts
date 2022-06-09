import {twofa} from '../lib';
import assert from 'assert';

const key = 'Hello, world!';
const mockCode = '058923';

test('GetCode', () => {
	const code = twofa.GetCode(key);
	console.debug("Code=", code);
})

test('GetCode with specified timestamp', () => {
	const code = twofa.GetCode(key, 1654776755584);
	console.debug("Code=", code);
	assert.strictEqual(code, mockCode)
})
