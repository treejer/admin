import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";


export default async ({ app }, inject) => {
    const walletName = app.$cookies.get('walletName');

    let instance = new Web3(Web3.givenProvider || new Web3.providers.HttpProvider(process.env.WEB3_PROVIDER));

    if (walletName === 'walletconnect') {
        const provider = new WalletConnectProvider({
            infuraId: process.env.INFURA_ID,
            rpc: {
                137: "https://polygon-mainnet.infura.io/v3/" + process.env.INFURA_ID
            }
        });
        await provider.enable();

        instance = new Web3(provider);
    }



    inject('web3', instance)
    // inject('treeFactory', new instance.eth.Contract(TreeFactory.abi, process.env.contractTreeFactoryAddress))
  
}
