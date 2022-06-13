import {randomFillSync} from 'crypto';

const randSize = 32;

// NewRand returns a random data
export function NewRand(): Uint8Array {
	return randomFillSync(new Uint8Array(randSize));
}
