# Two-FA.js

[![npm](https://img.shields.io/npm/v/@jovijovi/two-fa.js.svg)](https://www.npmjs.com/package/@jovijovi/two-fa.js)
[![GitHub Actions](https://github.com/jovijovi/two-fa.js/workflows/Test/badge.svg)](https://github.com/jovijovi/two-fa.js)
[![Coverage](https://img.shields.io/codecov/c/github/jovijovi/two-fa.js?label=\&logo=codecov\&logoColor=fff)](https://codecov.io/gh/jovijovi/two-fa.js)

A two-factor authentication(2FA) based on HOTP & TOTP written in [TypeScript](https://www.typescriptlang.org).

## Philosophy

*:kiss: KISS. Keep it small and simple.*

## Features

- Based on HOTP/TOTP algorithm
- Get code by raw key

## Development Environment

- typescript `4.7.3`
- node `v16.15.1`
- ts-node `v10.8.1`
- yarn `v1.22.18`

## Install

```shell
npm install @jovijovi/two-fa.js
```

or

```shell
yarn add @jovijovi/two-fa.js
```

## Usage

```typescript
import {twofa} from '@jovijovi/two-fa.js';

const code = twofa.GetCode(key);
console.debug("Code=", code);
```

## Roadmap

- Documents
- Get code by encoded key
- Encode/Decode key
- Gen random key

## License

[MIT](LICENSE)
