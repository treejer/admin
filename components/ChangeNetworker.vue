<template>
  <div
    class="network-changer float-right"
    :class="
      $store.state.loginToken || $cookies.get('loginToken')
        ? 'with-network-changer'
        : 'not-network-changer'
    "
    @click.prevent="showNetworks = !showNetworks"
  >
    <p class="btn-gray param tr-gray-seven text-capitalize">
      <span
        class="alert-icon-network"
        v-if="
          connectedNetwrokID != $hex2Dec($cookies.get('activeNetwork').chainId)
        "
        >&#9888;</span
      >

      {{ $cookies.get("activeNetwork").name }}
      <span>{{ showNetworks ? "&#8595;" : "&#8593;" }}</span>
    </p>
    <ul
      v-if="showNetworks"
      class="list-networks list-style-none text-capitalize bg-light-green"
    >
      <li
        v-if="item.key != $cookies.get('activeNetwork').key"
        v-for="(item, index) in networks"
        :key="index"
        @click.prevent="changeNetwork(item)"
        class="text-left tr-gray-three param"
      >
        <!-- <img :src="item.logo" :alt="item.name" width="100" height="35" /> -->
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      networks: [
        {
          name: "Polygon Mainnet",
          logo: require("~/assets/images/wallets/polygon.svg"),
          chainId: "0x89",
          chainName: "polygon",
          rpcUrls: ["https://polygon-rpc.com"],
          nativeCurrency: {
            nativeCurrencyname: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          key: "polygon",
          blockExplorerUrls: ["https://explorer.matic.network/"],
        },
        // {
        //   name: "Rinkeby Testnet",
        //   logo: require("~/assets/images/wallets/rinkeby.svg"),
        //   chainId: "0x4",
        //   chainName: "rinkeby",
        //   rpcUrls: ["https://rinkeby.infura.io/v3/" + process.env.infuraID],
        //   nativeCurrency: {
        //     nativeCurrencyname: "ETH",
        //     symbol: "ETH",
        //     decimals: 18,
        //   },
        //   key: "rinkeby",
        //   blockExplorerUrls: ["https://rinkeby.etherscan.io"],
        // },
        {
          name: "Goerli Testnet",
          logo: require("~/assets/images/wallets/goerli.svg"),
          chainId: "0x5",
          chainName: "goerli",
          rpcUrls: ["https://goerli.infura.io/v3/" + process.env.infuraID],
          nativeCurrency: {
            nativeCurrencyname: "GETH",
            symbol: "GETH",
            decimals: 18,
          },
          key: "goerli",
          blockExplorerUrls: ["https://goerli.etherscan.io"],
        },
        {
          name: "Polygon Test Mainnet",
          logo: require("~/assets/images/wallets/polygon.svg"),
          chainId: "0x89",
          chainName: "polygon",
          rpcUrls: ["https://polygon-rpc.com"],
          nativeCurrency: {
            nativeCurrencyname: "MATIC",
            symbol: "MATIC",
            decimals: 18,
          },
          key: "polygont",
          blockExplorerUrls: ["https://explorer.matic.network/"],
        },
        // {
        //   name: "Ethereum Mainnet RPC",
        //   logo: require("~/assets/images/wallets/ethereum.svg"),
        //   chainId: "0x1",
        //   chainName: "ETH",
        //   rpcUrls: [
        //     "https://rinkeby.infura.io/v3/",
        //   ],
        //   nativeCurrency: [
        //     { nativeCurrencyname: "ETH" },
        //     { symbol: "ETH" },
        //     { decimals: 0 },
        //   ],
        //   blockExplorerUrls: "https://etherscan.io",
        // },
        // {
        //   name: "Binance Smart Chain Mainnet RPC",
        //   logo: require("~/assets/images/wallets/binance.svg"),
        //   chainId: "56",
        //   chainName: "BNB",
        //   rpcUrls: ["https://bsc-dataseed.binance.org/"],
        //   nativeCurrency: [
        //     { nativeCurrencyname: "BNB" },
        //     { symbol: "BNB" },
        //     { decimals: 0 },
        //   ],
        //   blockExplorerUrls: "https://bscscan.com",
        // },

        // {
        //   name: "Arbitrum Mainnet RPC",
        //   logo: require("~/assets/images/wallets/arbitrum.svg"),
        //   chainId: "4689",
        //   chainName: "ETH",
        //   rpcUrls: ["https://babel-api.mainnet.iotex.io"],
        //   nativeCurrency: [
        //     { nativeCurrencyname: "ETH" },
        //     { symbol: "ETH" },
        //     { decimals: 0 },
        //   ],
        //   blockExplorerUrls: "https://arbiscan.io/",
        // },
      ],
      showNetworks: false,
      connectedNetwrokID: "0x89",
      alertIcon: require("~/assets/images/wallets/roystonlodge-Simple-Glossy-Circle-Button-Red.svg"),
    };
  },
  created() {
    let self = this;
    if (!self.$cookies.get("activeNetwork")) {
      this.$cookies.set("activeNetwork", self.networks[0]);
    }

    setTimeout(async () => {}, 500);

    if (process.client && this.$web3.givenProvider) {
      self.$web3.eth.net.getId().then((netId) => {
        self.connectedNetwrokID = netId;
        console.log(self.connectedNetwrokID, "self.connectedNetwrokID ");

        if (
          netId == this.$hex2Dec(self.$cookies.get("activeNetwork").chainId)
        ) {
          return;
        }
        // self.$bvToast.toast(
        //   self.$t("alert.switchto") +
        //     self.$cookies.get("activeNetwork").chainName +
        //     " " +
        //     self.$t("alert.network"),
        //   {
        //     title: "Wrongnetwork",
        //     href: "https://blog.treejer.com/announcing-the-launch-of-treejer-protocol-with-genesis-trees/",
        //     variant: "danger",
        //     solid: true,
        //     toaster: "b-toaster-bottom-left",
        //     noAutoHide: true,
        //   }
        // );
      });
    }

    if (process.client && window.ethereum) {
      window.ethereum.on("chainChanged", function (networkId) {
        self.connectedNetwrokID = networkId;
        // window.location.reload();
      });
    }
  },
  computed: {
    checkNetwork() {
      if (this.$cookies.get("loginToken")) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    async changeNetwork(item) {
      let self = this;

      await this.$web3.currentProvider.enable();

      await this.$web3.currentProvider
        .request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: item.chainId }],
        })
        .then((res) => {
          self.setData(item);
          window.location.reload();
        })
        .catch(async (error) => {
          if (error.code === 4902) {
            await self.$web3.currentProvider
              .request({
                method: "wallet_addEthereumChain",
                params: [
                  {
                    chainId: item.chainId,
                    chainName: item.chainName,
                    rpcUrls: item.rpcUrls,
                    nativeCurrency: item.nativeCurrency,
                    blockExplorerUrls: item.blockExplorerUrls,
                  },
                ],
              })
              .catch((error) => {
                console.log(error, "error is here");
              })
              .then((res) => {
                self.setData(item);
                window.location.reload();
              });
          } else {
            console.log(error, "error");
          }
        });
    },
    setData(item) {
      this.$cookies.set("activeNetwork", item);

      if (item.key == "polygon") {
        this.$cookies.set("config", process.env.polygon);
      } else if (item.key == "polygont") {
        this.$cookies.set("config", process.env.polygont);
      } else if (item.key == "rinkeby") {
        this.$cookies.set("config", process.env.rinkeby);
      } else if (item.key == "goerli") {
        this.$cookies.set("config", process.env.goerli);
      }
      console.log(this.$cookies.get("config"), "config cookies is here ");
      this.$cookies.remove("loginToken");

      this.$cookies.remove("userId");
    },
  },
};
</script>

<style lang="scss" scoped>
.network-changer {
  z-index: +999;
  position: relative;
  margin-top: 12px;
  .alert-icon-network {
    color: red;
  }

  .btn-gray {
    background-color: #eeeeee;
    padding: 8px 20px 5px 15px;
    border: solid 2px white;
    // box-shadow: rgba(168, 168, 168, 0.1) 0px 2px 5px;
    color: #616161;

    border-radius: 16px;
  }

  @media (max-width: 420px) {
    margin-right: 5px;
  }

  .list-style-none {
    width: auto;

    position: absolute;
    top: 50px;
    border-radius: 7px;
    list-style: none;
    z-index: +999;
    box-shadow: rgba(168, 168, 168, 0.1) 0px 2px 5px;

    li {
      text-align: left;
      padding: 10px 15px;
    }
  }
}
@media (max-width: 768px) {
  .network-changer {
    left: 19px;
    top: 30px;
    position: absolute;
    max-width: 100px;
    z-index: +9999;

    .btn-gray {
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      font-size: 12px;
    }
  }
  .with-network-changer {
    top: 0;
  }
}
</style>
