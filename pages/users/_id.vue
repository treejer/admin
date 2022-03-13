<template>
  <div class="container user-page-details" v-if="userDetails">
    <div class="row">
      <div class="col-12 position-relative">
        <div
          class="banner"
          :style="`background-image:url(${icon}${userDetails.user.publicAddress})`"
        ></div>

        <div class="box-banner-details">
          <div class="row">
            <div class="col-md-3 user-img">
              <img
                class="img-rounded"
                :src="`${icon}${userDetails.user.publicAddress}`"
                :alt="
                  userDetails.user.email
                    ? userDetails.user.email
                    : userDetails.user.firstName
                "
              />
              <h1 class="title-md tr-gray-nine mt-2 font-weight-bolder">
                {{
                  userDetails.user.firstName
                    ? userDetails.user.firstName + userDetails.user.lastName
                    : "User name"
                }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div
        class="
          mt-5
          font-weight-bolder
          param-gray-two
          user-detail-main
          position-relative
          over-flow-hidden
          w-100
        "
        v-if="userDetails.user"
      >
        <img
          class="edit-button pointer-event"
          src="~/assets/images/users/edit-button.svg"
          alt=""
          @click.prevent="changeProfile()"
        />
        <p>
          Email: <span>{{ userDetails.user.email }}</span>
        </p>
        <p>
          Firstname: <span>{{ userDetails.user.firstName }}</span>
        </p>
        <p>
          Lastname: <span>{{ userDetails.user.lastName }}</span>
        </p>
        <p>
          CreatedAt: <span>{{ userDetails.user.createdAt }}</span>
        </p>
        <p>Mobile:{{ userDetails.user.mobile }}</p>
        <p>
          Public address: <span>{{ userDetails.user.publicAddress }}</span>
        </p>
        <p>
          Password: <span>{{ userDetails.user.password }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      userDetails: "",

      icon: process.env.GRAVATAR,
    };
  },
  async created() {
    await this.getUser();
    console.log(process.env.GRAVATAR, ".env.gravatar is here");
  },
  methods: {
    async getUser() {
      let self = this;
      await self.$axios
        .$get(`${process.env.API_URL}/admin/users/${self.$route.params.id}`)
        .then((result) => {
          console.log(result, "result is here");
          self.userDetails = result;
        })
        .catch((err) => {});
      console.log(self.userDetails, "self.user is here");
    },
    changeProfile(){
      
    }
  },
};
</script>
<style lang="scss" scoped>
.user-page-details {
  .banner {
    padding: 15px 25px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-height: 25vh;
    box-shadow: 4px 4px 44px rgba(0, 0, 0, 0.1);
    border-radius: 7px;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    border: 2px solid rgb(255, 255, 255);
    width: 100%;
    position: absolute;
    top: 20px;
    left: 0;
  }
  .box-banner-details {
    margin-top: 50px;
    height: 20vh;
    padding: 5px 25px;
    .user-img {
      img {
        z-index: +999;
        border-radius: 50%;
        height: 100px;
        filter: blur(0px);
        -webkit-filter: blur(0px);
        border: 2px solid rgb(255, 255, 255);
      }
    }
  }
  .user-detail-main {
    .edit-button {
      position: absolute;
      width: 25px;
      right: 25px;
    }
    overflow: hidden;
    background: #ffffff;
    box-shadow: 2px 4px 42px rgba(0, 0, 0, 0.1);
    padding: 15px 35px;
    p,
    span {
      word-wrap: break-word;
    }
    span {
      padding-left: 5px;
      color: #424242;
    }
  }
}
</style>
