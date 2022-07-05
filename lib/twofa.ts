import {BinaryLike, createHmac} from 'crypto';
import {NewRand} from './random';
import {IOptionFunc, IOptions, NewOptions} from './options';
import * as base32 from './base32';

const CodeDigits6 = 6;
const CodeDigits7 = 7;
const CodeDigits8 = 8;

const power = new Map([
	[CodeDigits6, 1e6],
	[CodeDigits7, 1e7],
	[CodeDigits8, 1e8],
]);

export function GetCode(key: string, tm?: number): string {
	const raw = Buffer.from(DecodeKey(key));
	const code = tOTP(raw, tm ? tm : new Date().getTime(), CodeDigits6).toString();

	if (code.length < CodeDigits6) {
		return code.padStart(CodeDigits6, '0');
	}
	return code;
}

function checkDigits(digits: number) {
	if (!power.has(digits)) {
		throw new Error('invalid digits');
	}
}

export function toBuffer(value: number): Buffer {
	let buf = Buffer.alloc(8);

	let tmp = value;
	for (let i = 0; i < 8; i++) {
		buf[7 - i] = tmp & 0xFF;
		tmp = tmp >> 8;
	}

	return buf;
}

function hOTP(key: BinaryLike, counter: number, digits: number): number {
	checkDigits(digits);

	const hmac = createHmac('sha1', key);
	const digest = hmac.update(toBuffer(counter)).digest();
	const bin = digest.subarray(digest[digest.length - 1] & 0x0F).readUInt32BE() & 0x7FFFFFFF;
	return bin % power.get(digits);
}

function tOTP(key: BinaryLike, tm: number, digits: number): number {
	return hOTP(key, Math.floor(tm / 30e3), digits);
}

// EncodeKey returns encoded key
export function EncodeKey<T extends IOptions>(raw: string, ...opt: IOptionFunc<T>[]): string {
	const opts = NewOptions<IOptions>(...opt);
	let key: string;
	if (opts.withHash) {
		const digest = opts.HashFunc.Hash(raw);
		key = base32.Encode(digest).toUpperCase();
	} else {
		key = base32.Encode(raw).toUpperCase();
	}

	// TODO: QR
	if (opts.withQR) {

	}

	return key;
}

export function DecodeKey(key: string): ArrayBuffer {
	return base32.Decode(key);
}

// GenKey returns random encoded key
export function GenKey<T extends IOptions>(...opt: IOptionFunc<T>[]): string {
	const val = NewRand();
	if (!val) {
		throw new Error('invalid random');
	}

	return EncodeKey(val.toString(), ...opt);
}
