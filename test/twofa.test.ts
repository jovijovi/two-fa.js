import {createHash} from 'crypto';
import assert from 'assert';
import {twofa} from '../lib';
import {WithDefaultHashFunc, WithHashFunc} from '../lib/options';
import {HashFunc} from '../lib/hash';

const mockKey = 'JBSWY3DPFQQHO33SNRSCC';
const mockRawKey = 'Hello, world!';
const mockCode = '982378';

function customHashFunc(): HashFunc {
	const hashFunc = new HashFunc();
	hashFunc.Provider = () => createHash('sha256');
	return hashFunc
}

test('GetCode', () => {
	const code = twofa.GetCode(mockKey);
	console.debug("Code=", code);
})

test('GetCode with specified timestamp', () => {
	const code = twofa.GetCode(mockKey, 1655204300628);
	console.debug("Code=", code);
	assert.strictEqual(code, mockCode)
})

test('Base32(Encode/Decode)', () => {
	const cipherText = twofa.EncodeKey(mockRawKey);
	console.debug("Encoded Key=", cipherText);
	const plainText = twofa.DecodeKey(cipherText);
	const utf8string = Buffer.from(plainText).toString('utf8');
	assert.strictEqual(utf8string, mockRawKey)
})

test('GenKey', () => {
	const key = twofa.GenKey();
	console.debug("Key=", key);
	const plainKey = twofa.DecodeKey(key);
	console.debug("PlainKey=", plainKey);
})

test('GenKey with default hash function', () => {
	const key = twofa.GenKey(
		WithDefaultHashFunc(),
	);
	console.debug("Key=", key);

	const code = twofa.GetCode(key);
	console.debug("Code=", code);
})

test('GenKey with custom hash function', () => {
	const key = twofa.GenKey(
		WithHashFunc(customHashFunc()),
	);
	console.debug("Key=", key);

	const code = twofa.GetCode(key);
	console.debug("Code=", code);
})
