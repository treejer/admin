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
        <div class="edit-button">
          <img
            class="pointer-event"
            src="~/assets/images/users/edit-button.svg"
            alt=""
            @click.prevent="changeProfile()"
          />
          <button
            class="btn-green join-by-admin"
            @click.prevent="joinByAdmin()"
          >
            Planter join by admin
          </button>
          <button class="btn-green" @click.prevent="joinByOrganization()">
            Organization join
          </button>
        </div>

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
          CreatedAt:
          <span>{{
            $moment(userDetails.user.createdAt).strftime("%Y-%m-%d %I:%M")
          }}</span>
        </p>
        <p>Mobile:{{ userDetails.user.mobile }}</p>
        <p>
          Public address: <span>{{ userDetails.user.publicAddress }}</span>
        </p>
        <p>
          Password: <span>{{ userDetails.user.password }}</span>
        </p>
        <img
          v-if="userDetails.file"
          class="img-fluid"
          :src="`${baseUrl}/files/${userDetails.file.filename}`"
          :alt="userDetails.file.filename"
        />
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
      baseUrl: process.env.BASE_URL,
      icon: process.env.GRAVATAR,
    };
  },
  async created() {
    await this.getUser();
    await this.getApplications();
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
        .catch((err) => {
          console.log(err, "err is here");
        });
      console.log(self.userDetails, "self.user is here");
    },
    async getApplications() {
      let self = this;
      self.$axios
        .$get(
          `${process.env.API_URL}/admin/applications?filter={where:{userId:${self.$route.params.id}}}`
        )
        .then((res) => {
          console.log(res, "res is here");
        })
        .catch((err) => {
          console.log(err, "err is here");
        });
    },
    changeProfile() {},
    joinByAdmin() {},
    joinByOrganization() {},
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
      right: 25px;
      display: flex;
      flex-direction: column;
      float: right;
      img {
        width: 25px;
        position: absolute;
        right: 0;
      }
      button {
        margin-top: 15px;
        padding: 10px 25px;
      }
      .join-by-admin {
        margin-top: 35px;
      }
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
