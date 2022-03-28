<template>
  <div class="container user-page-details" v-if="tree">
    <div class="row">
      <div class="col-12 position-relative">
        <div
          class="banner"
          :style="`background-image:url(${icon}${tree.planter.id})`"
        ></div>

        <div class="box-banner-details">
          <div class="row">
            <div class="col-md-3 user-img">
              <img
                class="img-rounded"
                :src="`${icon}${tree.planter.id}`"
                alt="user-banner"
              />
               <h1 class="title-md tr-gray-nine mt-2 font-weight-bolder">
                Tree {{
                  tree.id
                }}
              </h1>
            </div>
          </div>
        </div>
      </div>
      <div class="col-12 mb-5">
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
      >
        <div class="edit-button text-capitalize">
          <img
            class="pointer-event"
            src="~/assets/images/users/edit-button.svg"
            alt=""
            @click.prevent="changeProfile()"
          />

          <b-button class="btn-green" v-b-modal.modal-1 v-if="txData"
            >Show Verify Box</b-button
          >

        
        </div>

        <h2 class="title tr-gray-two mb-md-4 font-weight-bolder">Tree Info</h2>

        <p>
         ID: <span>{{ tree.id }}</span>
        </p>
        <p>
         Birth date: <span>{{ tree.birthDate }}</span>
        </p>
       <p>
          Country Code: <span>{{ tree.countryCode }}</span>
        </p>
        <p>
         CreatedAt: <span>{{ tree.createdAt }}</span>
        </p>

       <p>
          Createdat:
          <span>{{
            $moment(tree.createdAt).utc()
          }}</span>
        </p>
      <p>
          Plant date: <span>{{ tree.plantDate }}</span>
        </p>
      <p>
         Planter: <span>{{ tree.planter.id }}</span>
        </p>
         <p>
          Status:
          <span>{{
          tree.status
          
          }}</span>
        </p>
         <p>
          TreeSpecs: <span>{{tree.treeSpecs}}</span>
        </p>
       <p>
          Tree Specs Entity: <span>{{ tree.treeSpecsEntity }}</span>
        </p>
         <p>
          UpdatedAt: <span>{{ tree.updatedAt }}</span>
        </p>
  
        </div>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  layout: "dashboard",
  data() {
    return {
      tree: null,
      icon: process.env.GRAVATAR,
    };
  },
  async created() {
    console.log(this, "this is here");
    await this.getTree();
  },
  methods: {
    async getTree() {
      let self = this;
      self.loading = true;
      await self.$axios
        .$post(`${process.env.GRAPHQL_URL}`, {
          query: `{
             tempTree(id: "${self.$route.params.id}"){
            id
            planter {
            id
              }
            countryCode
             status
             plantDate
             birthDate
             treeSpecs
             createdAt
             updatedAt
		        treeSpecsEntity{
                      id
                      name
                      description
                      externalUrl
                      imageFs
                      imageHash
                      symbolFs
                      symbolHash
                      animationUrl
                      diameter
                      latitude
                      longitude
                      attributes
                      updates
                      nursery
                      locations
                       }

                       }
                   }
          `,
        })
        .then((res) => {
          self.tree = res.data.tempTree;
          console.log(self.tree, "self.tree is here");
        })
        .catch((err) => {
          self.$bvToast.toast(err.message, {
            variant: "danger",
            title: "Forbidden",
            toaster: "b-toaster-bottom-left",
          });
        })
        .finally(() => (self.loading = false));
    },
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
