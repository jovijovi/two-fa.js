import {BinaryLike, createHmac} from 'crypto';

const CodeDigits6 = 6
const CodeDigits7 = 7
const CodeDigits8 = 8

const power = new Map([
	[CodeDigits6, 1e6],
	[CodeDigits7, 1e7],
	[CodeDigits8, 1e8],
]);

export function GetCode(key: BinaryLike, tm?: number): string {
	const code = tOTP(key, tm ? tm : new Date().getTime(), CodeDigits6).toString();

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
	const bin = digest.slice(digest[digest.length - 1] & 0x0F).readUInt32BE() & 0x7FFFFFFF;
	return bin % power.get(digits);
}

function tOTP(key: BinaryLike, tm: number, digits: number): number {
	return hOTP(key, Math.floor(tm / 30e3), digits);
}
