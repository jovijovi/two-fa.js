import base32Encode from 'base32-encode';
import base32Decode from 'base32-decode';

const defaultRFC = 'RFC4648';

export function Encode(data: Uint8Array | string): string {
	return base32Encode(Uint8Array.from(Buffer.from(data)), defaultRFC, {padding: false});
}

export function Decode(val: string): ArrayBuffer {
	return base32Decode(val, defaultRFC);
}
