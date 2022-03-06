<template>
  <div>
    <button
      v-if="!hide && !$cookies.get('loginToken')"
      type="button"
      class="connect-button sign-button"
      @click.prevent="getToken()"
    >
      {{ !userAuthToken ? "Sign in to wallet" : "Loading..." }}
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
    hexEncode(str) {
      var hex, i;

      var result = "";
      for (i = 0; i < str.length; i++) {
        hex = str.charCodeAt(i).toString(16);
        result += ("000" + hex).slice(-4);
      }

      return result;
    },
    async getToken() {
      let self = this;

      await self.$axios
        .$get(
          process.env.API_URL +
            "/user/nonce?publicAddress=" +
            self.$cookies.get("account")
        )
        .then(async (res) => {
          console.log(res, "res is here");

          self.$cookies.set("loginToken", res.loginToken);
          self.$cookies.set("userId", res.userId);

          self.$web3.currentProvider.enable();

          var from = self.$cookies.get("account");

          var signature = await self.$web3.eth.personal.sign(
            self.hexEncode(res.message),
            from
          );

          console.log(signature, "signature");

          self.sendWebAuthToken(signature, from, res.userId);
        });
    },
    async sendWebAuthToken(signature, loginToken, userId) {
      let self = this;

      await self.$axios
        .$patch(
          `${self.api}/user/sign/?publicAddress=${self.$cookies.get(
            "account"
          )}`,
          {
            signature: signature,
            loginToken: loginToken,
            userId: userId,
          }
        )
        .then((res) => {
          console.log(res, "res is here");

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