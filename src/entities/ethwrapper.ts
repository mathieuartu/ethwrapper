import { Contract, JsonRpcProvider, Wallet, parseEther } from 'ethers'
import { EthWrapperContract, EthWrapperOptions, EthWrapperWrapOptions, EthWrapperOptionsWallet } from '../types/index'
import wethABI from '../abi/weth'

/**
 * Utility class used to wrap and unwrap ETH on any network that used ETH as a native currency and has an ERC20 WETH
 * contract
 */
export default class EthWrapper {
    private wallet: EthWrapperOptionsWallet
    private wethContractAddress

    private provider: JsonRpcProvider
    private signer: Wallet

    /**
     * Creates an EthWrapper instance
     *
     * @param {EthWrapperOptions} options
     * @param {String} options.rpcEndpointUrl The url of the JSON RPC of the network
     * @param {String} options.wethContractAddress The address of the WETH contract for this network
     * @param {EthWrapperOptionsWallet} options.wallet
     * @param {String} options.wallet.address The address of the wallet used to wrap/unwrap
     * @param {String} options.wallet.privateKey The private key of the wallet used to wrap/unwrap
     */
    constructor({ rpcEndpointUrl, wethContractAddress, wallet }: EthWrapperOptions) {
        this.wallet = wallet
        this.wethContractAddress = wethContractAddress

        this.provider = new JsonRpcProvider(rpcEndpointUrl)
        this.signer = new Wallet(this.wallet.privateKey, this.provider)
    }

    /**
     * Wraps native ETH to ERC20 WETH
     *
     * @param {EthWrapperWrapOptions} options
     * @param {Number} options.amount The amount of ETH to wrap (in ETH readable format)
     * @returns {Promise<string>} Hash of the wrap transaction
     */
    public async wrap({ amount }: EthWrapperWrapOptions): Promise<string> {
        const contract = new Contract(this.wethContractAddress, wethABI, this.signer)
        const value = parseEther(`${amount}`)
        const connectedContract = contract.connect(this.signer) as unknown as EthWrapperContract

        try {
            const transaction = await connectedContract.deposit({ value })
            return transaction.hash
        } catch (e) {
            const error = e as { code: string }
            throw new Error(error.code)
        }
    }

    /**
     * Unwraps ERC20 WETH to native ETH
     *
     * @param {EthWrapperWrapOptions} options
     * @param {Number} options.amount The amount of WETH to unwrap (in WETH units - readable format)
     * @returns {Promise<string>} Hash of the unwrap transaction
     */
    public async unwrap({ amount }: EthWrapperWrapOptions): Promise<string> {
        const contract = new Contract(this.wethContractAddress, wethABI, this.signer)
        const value = parseEther(`${amount}`)
        const connectedContract = contract.connect(this.signer) as unknown as EthWrapperContract

        try {
            const transaction = await connectedContract.withdraw(value)
            return transaction.hash
        } catch (e) {
            const error = e as { code: string }
            throw new Error(error.code)
        }
    }
}
