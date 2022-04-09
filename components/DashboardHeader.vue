<template>
  <div class="head-treejer-dashborad">
    <div
      class="headers container-fluid dashboard-header"
      style="min-height: 5vh"
    >
      <keep-alive>
        <b-navbar toggleable="lg">
          <b-navbar-nav>
            <client-only>
              <div class="d-lg-none d-block">
                <Metamask @showModal="showModal" />
              </div>
            </client-only>
          </b-navbar-nav>
          <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

          <b-collapse
            id="nav-collapse"
            class="text-right justify-content-between d-none"
            is-nav
          >
            <b-navbar-nav class="header-menu"></b-navbar-nav>
            <client-only>
              <div class="d-lg-block d-none">
                <Metamask @showModal="showModal" />
              </div>
            </client-only>
          </b-collapse>
        </b-navbar>
      </keep-alive>
      <b-modal id="five" centered hide-footer title=" ">
        <Wallets />
      </b-modal>
      <b-modal
        id="netName"
        class="justify-content-center text-center"
        hide-footer
        no-stacking
        ok-only
        size="md"
      >
        <div class="text-center justify-content-center m-auto">
          <h4 class="title-md tr-gray-one mb-4">Error occurred</h4>
          <p class="param tr-gray-three">
            Metamask should be on <strong> {{ networkName }} </strong> network.
          </p>
          <p class="param tr-gray-three">
            Currently it on {{ $store.state.netWorkName }} instead
          </p>
        </div>
      </b-modal>
    </div>
  </div>
</template>

<script>
import Metamask from "../components/Metamask";
import Wallets from "../components/Wallets";

export default {
  layout: "dashboard",
  name: "TreejerHeader",
  components: {
    Wallets,
    Metamask,
  },
  data() {
    return {
      wallets: [
        { name: "Metamask", step: 1 },
        { name: "Wallet Connect", step: 2 },
        { name: "Trezor", step: 3 },
        { name: "Ledger Nano", step: 4 },
        { name: "Coinbase Wallet", step: 5 },
      ],
      activeWallet: 0,
      formError: null,
      account: null,
      user: false,
      activeIndex: 0,
      items: [
        { name: "About", step: 1, href: "about" },
        { name: "Blog", step: 2 },
        { name: "For Business", step: 3, href: "business" },
        { name: "Find My Tree", step: 4, href: "find" },
      ],
      networkName: process.env.NETWORK_NAME,
    };
  },
  async mounted() {
    let self = this;
    // await web3.eth.getAccounts().then(res => {
    self.account = this.$cookies.get("account");
    await this.$store.dispatch("networkNames");
    // })
    await self.accountChange();
    setTimeout(() => {
      if (this.$web3.givenProvider === null) {
        return;
      }

      this.$web3.eth.net.getId().then((netId) => {
        if (netId.toString() === process.env.NETWORK_ID.toString()) {
          return;
        }
        self.$bvToast.toast(
          "Switch to " + process.env.NETWORK_NAME + " Network",
          {
            title: `Wrong network`,
            href: "https://blog.treejer.com/announcing-the-launch-of-treejer-protocol-with-genesis-trees/",
            variant: "danger",
            solid: true,
            toaster: "b-toaster-bottom-left",
            noAutoHide: true,
          }
        );
      });
    }, 1000);
  },
  computed: {},
  methods: {
    showModal(e) {
      this.$bvModal.show("five");
    },
    async accountChange() {

        let self = this;

      if (this.$cookies.get("walletName") === "metamask") {
        let self = this;
        if (process.client) {
          await window.ethereum.on("accountsChanged", async function  (accounts) {

            let firstAccount = null;
            await self.$web3.eth.getAccounts().then(e => { 
              firstAccount = e[0];
            }) 


            this.$cookies.set("account", firstAccount);

            if (self.account !== firstAccount) {
              self.$store.commit("SET_USER", firstAccount);
              self.$cookies.set("account", firstAccount);
              window.location.reload;
            }
          });
        }
      }
    },
    activeWallets(item, index) {
      this.activeWallet = index;
    },
    loginToast(variant, title, message, href) {
      this.$bvToast.toast(message, {
        title: title,
        variant: variant,
        href: href,
      });
    },
    makeToast(variant = null) {
      this.$bvToast.toast("install metamask from here", {
        title: `https://metamask.io/' ${variant || "default"}`,
        href: "https://metamask.io/",
        variant: variant,
        solid: true,
      });
    },
    activeMenu(item, index) {
      if (item.name === "Blog") {
        window.open("https://blog.treejer.com/", "_blank");
      } else {
        this.activeIndex = index;
      }
    },
  },
  created() {},
};
</script>

<style lang="scss">
.head-treejer-dashborad {
  .networkname {
    background: linear-gradient(90deg, #649173 0%, #cec99c 100%);
    height: 34px;
    z-index: +999;
  }
  .navbar-light .navbar-toggler {
    display: none;
  }
}
@media (max-width: 1023px) {
  .headers {
    padding: 0 10px;

    .header-menu {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 0 !important;
    }

    .navbar-light .navbar-toggler-icon {
      background-image: url("../assets/images/home/burger.svg");
      background-size: auto;
    }

    .navbar {
      padding: 0;
      width: 100%;
      justify-content: flex-end;
    }
  }
}
</style>
