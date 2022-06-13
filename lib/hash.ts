import {BinaryLike, createHash, Hash} from 'crypto';

const defaultHashAlg = 'sha1';

export interface IHashFunc {
	Hash(msg: BinaryLike): Buffer
}

type HashProvider = (alg?: string) => Hash;

export class HashFunc implements IHashFunc {
	Provider: HashProvider;

	Hash(msg: BinaryLike): Buffer {
		const provider = this.Provider();
		provider.update(msg);
		return provider.digest();
	}
}

export function DefaultHashFunc(): HashFunc {
	const hashFunc = new HashFunc();
	hashFunc.Provider = () => createHash(defaultHashAlg);
	return hashFunc
}
