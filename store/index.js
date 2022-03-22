import WalletConnect from "walletconnect";

export const state = () => ({
  token: null,
  toast: false,
  sliceAccount: null,
  index: 0,
  account: null,
  dashboard: false,
  users: null,
  chainId: null,
  trezorPopup: null,
  ledger: null,
  form: null,
  ethPrice: 0,
  netWorkName: null,
  leaderBoards: null,
  hasMetaMask: false,
  fortmatic: null,
  torus: null,
  connectingWallet: null,
  modalFive: false,
});

export const actions = {
  async networkNames({ commit }) {
    if (process.client && this.$web3.givenProvider) {
      const web3 = this.$web3;
      //  netName = web3.version.network
      let netName = "mainnet";
      const networkId = await web3.eth.net.getId();
      switch (networkId.toString()) {
        case "1":
          let netName = "mainnet";
          console.log("This is mainnet");
          break;
        case "2":
          console.log("This is the deprecated Morden test network.");
          netName = "Morden";
          break;
        case "3":
          console.log("This is the ropsten test network.");
          netName = "ropsten";
          break;
        case "4":
          console.log("This is the Rinkeby test network.");
          netName = "Rinkeby";
          break;
        case "5":
          console.log("This is the Goerly test network.");
          netName = "Goerly";
          break;
        default:
          console.log("This is an unknown network.");
          netName = "unknown";
      }
      commit("SET_NET_NAME", netName);
    }
  },
  async metaMask() {

    this.$cookies.set("walletName", "metamask");

    await ethereum.enable();

    let firstAccount = null;
    await this.$web3.eth.getAccounts().then(e => { 
      firstAccount = e[0];
    }) 

    console.log(firstAccount, "account")

    this.$cookies.set("account", firstAccount);
    if (firstAccount) {
      window.location.reload();
    }
  },
  

  async walletConnect({ commit }) {
    let self = this;
    self.$cookies.set("walletName", "walletconnect");

    const wc = new WalletConnect({
      infuraId: process.env.INFURA_ID,
      rpc: {
        137: "https://polygon-mainnet.infura.io/v3/" + process.env.INFURA_ID,
      },
    });
    const connector = await wc.connect();
    const account = connector._accounts[0];
    console.log(account, connector, "connector is ghere");
    self.$cookies.set("account", account);
    window.location.reload;

  },
  async activeIndex({ commit }, { activeIndex }) {
    await commit("SET_SIDEBAR_INDEX", activeIndex);
  },
  async refreshChain() {
    if (process.client) {
      ethereum.autoRefreshOnNetworkChange = true;
      let currentChainId = ethereum.chainId;
    }
  },
  async logout({ commit }) {
    let self = this;
    const walletName = this.$cookies.get("walletName");
    if (walletName === "metamask") {
      const eth = await ethereum;
      const dc = eth.on("disconnect", (error) => console.log(err, "err"));
      eth.autoRefreshOnNetworkChange = true;
    }

    self.$cookies.set("walletName", null);
    self.$cookies.set("account", null);
    self.$cookies.set("loginToken", null);
    self.$cookies.set("userId", null);
    commit("SET_USER", null);
    commit("SET_WALLET", null);
  },
  hasDashboard({ commit }, { status }) {
    commit("SET_DASHBOARD", status);
  },
  async setEthPrice({ commit, state }) {
    if (parseFloat(state.ethPrice) > 0 || parseInt(state.ethPrice) > 0) {
      return;
    }

    await this.$axios
      .$get(process.env.apiUrl + "/prices")
      .then((res) => {
        commit("SET_ETH_PRICE", res.result.ethusd);
      })
      .catch((err) => {
        console.log(err.message, "err setEthPrice");
      });
  },
  async getLeaderBoards({ commit }) {
    const leaderBoards = await this.$axios.$get(
      `${process.env.apiUrl}/trees/leaderboard?perPage=10`
    );
    commit("SET_LEADERBOARDS", leaderBoards.leaderboard.data);
  },
};

export const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },

  SET_MODAL_FIVE(state, modalFive) {
    state.modalFive = modalFive;
  },
  // SET_FORTMATIC(state, fortmatic) {
  //   state.fortmatic = fortmatic
  // },
  SET_WALLET(state, connectingWallet) {
    state.connectingWallet = connectingWallet;
  },

  SET_SIDEBAR_INDEX(state, index) {
    state.index = index;
  },
  SET_LEADERBOARDS(state, leaderBoards) {
    state.leaderBoards = leaderBoards;
  },
  SET_USER(state, account) {
    state.account = account;
  },
  SET_NET_NAME(state, netId) {
    state.netWorkName = netId;
  },
  SET_DASHBOARD(state, status) {
    state.dashboard = status;
  },
  SET_ETH_PRICE(state, ethPrice) {
    state.ethPrice = ethPrice;
  },
};
