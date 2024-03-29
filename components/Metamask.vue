<template>
  <b-navbar-nav ref="page" class="metamask">
    <b-nav-form v-if="!$cookies.get('account')">
      <b-button class="connect-button m-auto" @click.prevent="showModal()">
        {{ "Connect Wallet" }}
      </b-button>

      <a @click.prevent="goToDashboard()" class="position-relative">
        <img
          alt="tree"
          class="img-fluid tree pointer-event"
          name="tree"
          src="/tree.svg"
        />
        <Badge />
      </a>
    </b-nav-form>

    <b-nav-form class="pointer-event" v-if="$cookies.get('account')">
      <div
        v-if="connectedNetwrokID != runningNetworkID"
        class="
          pointer-event
          accounting-card
          d-flex
          align-items-center align-self-center
          pointer-event
        "
        @click.prevent="switchNetworkMatic()"
      >
        <!-- <b-button class="connect-button switch-wallet">
          Switch to Matic
        </b-button> -->
      </div>
      <SignWallets v-if="!$cookies.get('loginToken')" />
      <div
        class="
          pointer-event
          accounting-card
          d-flex
          align-items-center align-self-center
          pointer-event
        "
        @click.prevent="logout()"
      >
        <span v-coin class="param-sm tr-gray-three">{{
          $cookies.get("account")
        }}</span>
        <span class="img"
          ><img
            :src="icon"
            alt="accounting"
            class="img-fluid bg-white d-none d-md-block rounded-circle"
            height="42"
            style="border: solid 2px white"
            width="42"
        /></span>
      </div>

      <a @click.prevent="goToDashboard()" class="position-relative">
        <img
          alt="tree"
          class="img-fluid tree pointer-event"
          name="tree"
          src="/tree.svg"
        />
        <Badge />
      </a>
    </b-nav-form>
    <b-modal
      id="seven"
      hide-footer
      @close="$bvModal.hide('seven')"
      @hide="$bvModal.hide('seven')"
    >
      <ul v-if="$cookies.get('walletName')" class="list-style-none seven">
        <li
          class="
            param-18
            tr-gray-two
            font-weight-bold
            text-center
            mt-3
            mb-4
            text-center
          "
        >
          Connected with
        </li>
        <li class="pointer-event mb-2">
          <p
            class="
              tr-gray-three
              param
              font-weight-bold
              d-flex
              justify-content-between
            "
            style="
              border: 1px solid #bdbdbd;
              background: #e5e7db;
              padding: 15px 25px;
              width: 75%;
              margin: auto;
              border-radius: 7px;
            "
          >
            <span class="name text-capitalize">
              {{ $cookies.get("walletName") }}
            </span>
            <span class="icon">
              <img
                v-if="$cookies.get('walletName')"
                :alt="$cookies.get('walletName')"
                :src="
                  require(`~/assets/images/wallets/${$cookies.get(
                    'walletName'
                  )}.svg`)
                "
                class="img-fluid bg-white"
              />
            </span>
          </p>
        </li>
        <li
          class="
            param
            font-weight-bold
            tr-gray-two
            text-center
            mt-3
            whatis
            position-relative
          "
        >
          <span style="letter-spacing: -3px"
            >-------------------------------------</span
          ><span style="padding: 0 10px">Your Address</span
          ><span style="letter-spacing: -3px"
            >-------------------------------------</span
          >
        </li>
        <li class="d-flex mt-4 align-items-center justify-content-center">
          <CopyToClipBoard />
        </li>
        <li class="d-flex mt-4 justify-content-center text-center">
          <button
            class="btn-green param pr-4 pl-4 pt-2 pb-2"
            @click="changeWallet()"
          >
            Change Wallet
          </button>
        </li>
      </ul>
    </b-modal>
  </b-navbar-nav>
</template>

<script>
import Wallets from "./Wallets";
import CopyToClipBoard from "./CopyToClipBoard.vue";
import Badge from "@/components/Badge";
import SignWallets from "./signWallets.vue";

export default {
  components: { Wallets, CopyToClipBoard, Badge, SignWallets },
  props: ["wallets"],

  data() {
    return {
      icon: null,
      account: null,
      hasAccount: false,
      hasAccountSrc: `${this.$cookies.get("account")}`,
      loading: false,
      runningNetworkID: parseInt(process.env.NETWORK_ID),
      connectedNetwrokID: parseInt(process.env.NETWORK_ID),
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.account;
    },
  },
  async mounted() {
    if (this.$cookies.get("account")) {
      this.changeEthereum();
    } else {
      return null;
    }

    let self = this;
    setTimeout(async () => {
      if (process.client && self.$web3.givenProvider) {
        self.connectedNetwrokID = await self.$web3.eth.net.getId();
      }
    }, 500);

    if (process.client && window.ethereum) {
      // // use MetaMask's provider
      // App.web3 = new Web3(window.ethereum);
      // window.ethereum.enable(); // get permission to access accounts

      // // detect Metamask account change
      // window.ethereum.on('accountsChanged', function (accounts) {
      //   console.log('accountsChanges',accounts);

      // });

      // detect Network account change
      window.ethereum.on("networkChanged", function (networkId) {
        console.log("networkChanged", networkId);
        self.connectedNetwrokID = networkId;
      });
    }
  },

  methods: {
    async switchNetworkMatic() {
      // this.$web3.currentProvider.enable();
      await this.$web3.currentProvider.enable();

      try {
        await this.$web3.currentProvider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: this.$dec2hex(137) }],
        });
      } catch (error) {
        if (error.code === 4902) {
          try {
            await this.$web3.currentProvider.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: this.$dec2hex(137).toString(),
                  chainName: "Polygon Mainnet",
                  rpcUrls: [
                    "https://polygon-rpc.com",
                    "https://rpc.matic.today",
                  ],
                  nativeCurrency: {
                    name: "Matic",
                    symbol: "Matic",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://polygonscan.com"],
                },
              ],
            });
          } catch (error) {
            console.log(error.message, "error");
          }
        }
      }
    },
    async changeEthereum() {
      let self = this;
      self.icon = `${process.env.avatarURL}${this.$cookies.get("account")}`;
      // await ethereum.on("chainChanged", () => {
      //   document.location.reload();
      // });
    },
    changeWallet() {
      let self = this;
      this.$store.dispatch("logout").then(() => {
        window.location.reload();
        // self.$router.push(`/`);
      });
      this.$bvModal.hide("seven");
      this.$bvModal.show("five");
    },
    logout() {
      this.$bvModal.show("seven");
    },
    goToDashboard() {
      this.$store.commit("SET_SIDEBAR_INDEX", 0);
      this.$router.push("/");
    },
    copyClipboard(e) {},
    showModal() {
      this.$emit("showModal");
    },
    activeMenu(item, index) {
      if (item.name === "Blog") {
        window.open("https://blog.treejer.com/", "_blank");
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
