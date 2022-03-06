<template>
  <div class="container">
    <div class="row">
      <div class="col-12">
        {{ $route.params.id }}
        {{user}}
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      user: null,
    };
  },
  mounted(){
    this.getUser();
  },
  methods: {
    async getUser() {
      let self = this;
      self.user = await self.$axios.$get(
        `${process.env.API_URL}/users/${self.$route.params.id}`,
      );
      console.log(self.user,"self.user is here")
    },
  },
};
</script>
<style lang="scss" scoped>
</style>
