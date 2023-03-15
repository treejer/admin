<template>
  <div>
    <button
      v-if="!hide && !$cookies.get('loginToken')"
      type="button"
      class="connect-button sign-button"
      @click.prevent="getToken()"
    >
      {{ !userAuthToken ? "Sign in by wallet" : "Loading..." }}
    </button>
  </div>
</template>

<script>
export default {
  name: "signWallets",
  data() {
    return {
      userAuthToken: null,
      hide: false,
      api: process.env.API_URL,
    };
  },
  created() {},
  methods: {
    async getToken() {
      let self = this;

      await self.$axios
        .$get(
          this.$cookies.get('config').apiUrl +
            "/user/nonce?publicAddress=" +
            self.$cookies.get("account")
        )
        .then(async (res) => {
          console.log(res, "res is here");

          self.$cookies.set("loginToken", res.loginToken);

          self.$cookies.set("userId", res.userId);

          self.$web3.currentProvider.enable();

          var from = self.$cookies.get("account");

          var signature = await self.$web3.eth.personal
            .sign(res.message, from)
            .then((signature) => {
              self.sendWebAuthToken(signature, from, res.userId);
              self.$store.commit("SET_LOGIN_TOKEN", true);
              console.log(self.$store.state.loginToken,"self.$store.state.loginTokenis heere")
            })
            .catch((err) => {
              console.log(err, "err");
            });
        });
    },
    async sendWebAuthToken(signature, loginToken, userId) {
      let self = this;

      await self.$axios
        .$patch(
          `${self.$cookies.get('config').apiUrl}/user/sign/?publicAddress=${self.$cookies.get(
            "account"
          )}`,
          {
            signature: signature,
            loginToken: loginToken,
            userId: userId,
          }
        )
        .then((res) => {
          if (res.loginToken) {
            self.$cookies.set("loginToken", res.loginToken);
            self.hide = true;
            this.$bvToast.toast(
              `Now, you have access to the admin restricted area.`,
              {
                variant: "success",
                title: "Login successful",
                toaster: "b-toaster-bottom-left",
              }
            );
          } else {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Failed to login!",
              toaster: "b-toaster-bottom-left",
            });
          }
        })
        .catch((err) => {
          console.log(err, "err is here");
        });
    },
  },
};
</script>

<style lang='scss'>
.sign-button {
  margin-right: 100px;
}
</style>