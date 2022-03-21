import Web3 from 'web3'
import WalletConnectProvider from "@walletconnect/web3-provider";

import Web3Adapter from '@gnosis.pm/safe-web3-lib'
import Safe from '@gnosis.pm/safe-core-sdk'


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
    

    //create gnosis safe instance
    const ethAdapterOwner = new Web3Adapter({
        web3: instance,
        signerAddress: app.$cookies.get("account"),
    });

    const safeSdk = await Safe.create({
        ethAdapter: ethAdapterOwner,
        safeAddress: process.env.GNOSIS_SAFE_ADDRESS,
    });


    inject('web3', instance)
    inject('safeSdk', safeSdk)
    // inject('treeFactory', new instance.eth.Contract(TreeFactory.abi, process.env.contractTreeFactoryAddress))
  
}
