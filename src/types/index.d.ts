import { ContractTransactionResponse } from 'ethers'

export type EthWrapperOptionsWallet = {
    address: string
    privateKey: string
}

export interface EthWrapperOptions {
    wallet: EthWrapperOptionsWallet
    rpcEndpointUrl: string
    wethContractAddress: string
}

export interface EthWrapperWrapOptions {
    amount: number
}

export type EthWrapperContract = {
    deposit: ({ value }: { value: bigint }) => Promise<ContractTransactionResponse>
    withdraw: (value: bigint) => Promise<ContractTransactionResponse>
}
