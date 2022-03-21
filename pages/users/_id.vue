<template>
  <div class="container user-page-details" v-if="userDetails">
    <div class="row">
      <div class="col-12 position-relative">
        <div
          class="banner"
          :style="`background-image:url(${ $avatarByWallet(userDetails.user.publicAddress) })`"
        ></div>

        <div class="box-banner-details">
          <div class="row">
            <div class="col-md-3 user-img">
              <img
                class="img-rounded"
                :src="`${ $avatarByWallet(userDetails.user.publicAddress) }`"
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
          mb-5
          font-weight-bolder
          param-gray-two
          user-detail-main
          position-relative
          over-flow-hidden
          w-100
        "
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
          <button class="btn-green" @click.prevent="sendVerifyAndReject()">
            {{ userDetails.user.isVerified ? "Reject" : "Verify" }}
          </button>
        </div>


        <h2>
          User Info
        </h2>


<p>_id: <span>{{ userDetails.user._id }}</span> </p>
<p>firstName: <span>{{ userDetails.user.firstName }}</span> </p>
<p>lastName: <span>{{ userDetails.user.lastName }}</span> </p>
<p>createdAt: <span>{{  $moment(userDetails.user.createdAt).strftime("%Y-%m-%d %I:%M") }}</span> </p>
<p>email: <span>{{ userDetails.user.email }}</span> </p>
<p>emailToken: <span>{{ userDetails.user.emailToken }}</span> </p>
<p>emailVerifiedAt: <span>{{ userDetails.user.emailVerifiedAt ? $moment(userDetails.user.emailVerifiedAt).strftime("%Y-%m-%d %I:%M") : '-' }}</span> </p>
<p>isAdmin: <span>{{ userDetails.user.isAdmin }}</span> </p>
<p>isVerified: <span>{{ userDetails.user.isVerified }}</span> </p>
<p>lastLoginAt: <span>{{ userDetails.user.lastLoginAt }}</span> </p>
<p>mobile: <span>{{ userDetails.user.mobile }}</span> </p>
<p>mobileCode: <span>{{ userDetails.user.mobileCode }}</span> </p>
<p>mobileCodeRequestedAt: <span>{{ userDetails.user.mobileCodeRequestedAt }}</span> </p>
<p>mobileCodeRequestsCountForToday: <span>{{ userDetails.user.mobileCodeRequestsCountForToday }}</span> </p>
<p>mobileCountry: <span>{{ userDetails.user.mobileCountry }}</span> </p>
<p>mobileVerifiedAt: <span>{{ userDetails.user.mobileVerifiedAt }}</span> </p>
<p>publicAddress: <span>{{ userDetails.user.publicAddress }}</span> </p>
<p>signedAt: <span>{{ userDetails.user.signedAt }}</span> </p>
        

        <p v-if="userDetails.file">
        
          {{ userDetails.file.filename }}

          <button class="btn-green" @click.prevent="downloadFile()">
            Download File 
          </button>
        
        </p>


        <h2>
          Application Info
        </h2>
<p>latitude: <span>  {{ userDetails.application.latitude }}</span></p>
<p>longitude: <span>  {{ userDetails.application.longitude }}</span></p>

<p>

  <a
    :href="`https://www.google.com/maps/search/?api=1&query=${ userDetails.application.latitude },${ userDetails.application.longitude }`"
    target="_blank"
    rel="noopener noreferrer"> View on googlemap </a>

</p>

<p>organizationAddress: <span>  {{ userDetails.application.organizationAddress }}</span></p>
<p>referrer: <span>  {{ userDetails.application.referrer }}</span></p>
<p>status: <span>  {{ userDetails.application.status }}</span></p>
<p>type: <span>  {{ userDetails.application.type }}</span></p>



      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "dashboard",
  data() {
    return {
      userDetails: null,
      apiURL: process.env.API_URL,
      avatarURL: null
    };
  },
  async mounted() {
    await this.getUser();
    // await this.getApplications();

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
    async downloadFile() {

      if(!this.userDetails.file && !this.userDetails.file.filename  ) {
        return;
      }

      let self = this;
      await self.$axios
        .$get(`${process.env.API_URL}/files/${this.userDetails.file.filename }`,
          {
            responseType: 'blob'   
          }
        )
        .then((downloadFile) => {

          let filename = self.userDetails.user.firstName + " " + self.userDetails.user.lastName + " - " + self.userDetails.file.filename;

          let url = window.URL.createObjectURL(new Blob([downloadFile]));
          let link = document.createElement('a');
          link.href = url;
          link.setAttribute('download',  filename);
          document.body.appendChild(link);
          link.click();


        })
        .catch((err) => {
          console.log(err, "err is here");
        });
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
    async sendVerifyAndReject() {
      if (!confirm("Do you really want to change status?")) {
        return;
      }

      let self = this;

      const path = this.userDetails.user.isVerified ? "reject" : "verify";

      await self.$axios
        .$patch(
          `${process.env.API_URL}/admin/${path}?userid=${this.userDetails.user._id}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "x-auth-userid": self.$cookies.get("userId"),
              "x-auth-logintoken": self.$cookies.get("loginToken"),
            },
          }
        )
        .then((res) => {
          console.log(res, "res is here");

          if (res.statusCode) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          } else {
            self.$bvToast.toast(
              `User status successfully changed to ${
                this.userDetails.user.isVerified ? "Rejected" : "Verified"
              }`,
              {
                variant: "success",
                title: "Update status successful",
                toaster: "b-toaster-bottom-left",
              }
            );

            self.getUser();
          }
        })
        .catch((err) => {
          console.log(err, "err is here");

          self.$bvToast.toast(err.message, {
            variant: "danger",
            title: "Forbidden",
            toaster: "b-toaster-bottom-left",
          });
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
