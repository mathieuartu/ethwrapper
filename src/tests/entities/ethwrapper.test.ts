import EthWrapper from '../../entities/ethwrapper'

const arbitraryWallet = {
    address: '0x9f0F3809515628EF90216e1b989C160c25FfB5ef',
    privateKey: '0xe819dc6d391491e22f84f78f6f03da2f88f65b99ecad4a0bc726d006c9f49554',
}

const emptyConfig = {
    rpcEndpointUrl: '',
    wallet: {
        address: '',
        privateKey: '',
    },
    wethContractAddress: '',
}

const correctConfig = {
    rpcEndpointUrl: 'https://eth-goerli.public.blastapi.io',
    wallet: arbitraryWallet,
    wethContractAddress: '0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6',
}

describe('EthWrapper', () => {
    describe('constructor', () => {
        it('Should throw an error when the arguments are empty', () => {
            expect(() => new EthWrapper(emptyConfig)).toThrow()
        })
        it('Should not throw an error when the arguments are correct', () => {
            expect(() => new EthWrapper(correctConfig)).not.toThrow()
        })

        it('Should throw an error when the arguments are not in the expected format', () => {
            expect(
                () =>
                    new EthWrapper({
                        ...correctConfig,
                        wallet: {
                            ...arbitraryWallet,
                            privateKey: 'nothing',
                        },
                    })
            ).toThrow()
        })
    })

    const ethwrapper = new EthWrapper(correctConfig)

    describe('wrap', () => {
        it('should throw when having insufficient balance', async () => {
            await expect(ethwrapper.wrap({ amount: 0.001 })).rejects.toThrow()
        })
    })

    describe('unwrap', () => {
        it('should throw when having insufficient balance', async () => {
            await expect(ethwrapper.unwrap({ amount: 0.001 })).rejects.toThrow()
        })
    })
})
