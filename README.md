# ♻️ EthWrapper

![Unit tests](https://github.com/mathieuartu/ethwrapper/actions/workflows/unit-test.yml/badge.svg)
![Lint](https://github.com/mathieuartu/ethwrapper/actions/workflows/lint.yml/badge.svg)
![Build](https://github.com/mathieuartu/ethwrapper/actions/workflows/build.yml/badge.svg)
[![npm version](https://img.shields.io/npm/v/ethwrapper/latest.svg)](https://www.npmjs.com/package/ethwrapper/v/latest)
[![npm bundle size (scoped version)](https://img.shields.io/bundlephobia/minzip/ethwrapper/latest.svg)](https://bundlephobia.com/result?p=ethwrapper@latest)

A simple utility class that helps wrap and unwrap ETH on compatible networks (Ethereum, Optimism, Arbitrum One...)

## Installation

```
npm i ethwrapper
```

## Usage

```typescript
import EthWrapper from "ethwrapper"

const ethwrapper = new EthWrapper({
	rpcEndpointUrl: 'http://public-rpc-url.com',
	wallet: {
		address: '0xYOUR_ADDRESS_HERE',
		privateKey: '0xYOUR_PRIVATE_KEY_HERE',
	},
	wethContractAddress: '0xWETH_CONTRACT_ADDRESS',
})

(async () => {
	const wrapHash = await ethwrapper.wrap({ amount: 0.001 })
	const unwrapHash = await ethwrapper.unwrap({ amount: 0.05 })
})()
```
  
EthWrapper needs three things to work : 

- A public or private JSON-RPC url related to the network you want to wrap/unwrap on
- Your public and private keys in order to sign the contract calls
- The WETH contract address on the chain you are working on
