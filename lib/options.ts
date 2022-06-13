import {DefaultHashFunc, HashFunc} from './hash';

// IOptions default option interface
export interface IOptions {
	// HashFunc interface
	HashFunc: HashFunc

	// With hash
	withHash: boolean;

	// Key name
	KeyName: string;

	// With QR
	withQR?: boolean;
}

// OptionFunc option initializer function interface
export interface IOptionFunc<T> {
	(arg: T): T;
}

// NewOptions returns new options
export function NewOptions<T extends IOptions>(...optionFunc: IOptionFunc<T>[]): T {
	const opts = <T>{
		HashFunc: DefaultHashFunc(),
		withHash: false,
		withQR: false,
	}

	for (const f of optionFunc) {
		f(opts);
	}

	return opts;
}

// WithDefaultHashFunc option to configure default hash function (sha1)
export function WithDefaultHashFunc(): IOptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.withHash = true;
	}
}

// WithHashFunc option to configure hash function
export function WithHashFunc(hashFunc: HashFunc): IOptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.HashFunc = hashFunc;
		o.withHash = true;
	}
}

// WithQR option to configure QR
export function WithQR(isDryRun: boolean): IOptionFunc<any> {
	return <T extends IOptions>(o: T) => {
		o.withQR = isDryRun;
	}
}
