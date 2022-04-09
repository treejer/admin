<template>
  <div class="container user-page-details" v-if="tree">
    <div class="row">
      <div class="col-12 position-relative">
        <div
          class="banner mr-2 ml-2"
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
                  $hex2Dec(tree.id)
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
            @click.prevent=""
          />

          <button @click="$bvModal.show('eight')" class="btn-green mt-5"  
            >Show Verify Box</button
          >
           <b-modal  size="xl" hide-footer  id="eight">
            <p>hiiiii</p>  
          </b-modal>

        
        </div>

        <h2 class="title tr-gray-two mb-md-4 font-weight-bolder">Tree Info</h2>

        <p>
         ID: <span>{{$hex2Dec(tree.id) }}</span>
        </p>
        <p>
         Birth date: <span>{{  $moment(tree.birthDate * 1000).strftime("%Y-%m-%d %I:%M:%S")  }}</span>
        </p>
       <p>
          Country Code: <span>{{ tree.countryCode }}</span>
        </p>
        <p>
         CreatedAt: <span>{{   $moment(tree.createdAt * 1000).strftime("%Y-%m-%d %I:%M:%S") }}</span>
        </p>

      
      <p>
          Plant date: <span>{{  $moment(tree.plantDate * 1000).strftime("%Y-%m-%d %I:%M:%S") }}</span>
        </p>
      <p>
         Planter: <span>{{$hex2Dec(tree.planter.id) }}</span>
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
       <a
              class="mb-3 font-weight-bolder tr-green"
              :href="`https://www.google.com/maps/search/?api=1&query=${tree.treeSpecsEntity.latitude},${tree.treeSpecsEntity.longitude}`"
              target="_blank"
              rel="noopener noreferrer"
            >
              View on googlemap
            </a>
              <p class="mt-3">
          UpdatedAt: <span>{{ $moment(tree.updatedAt * 1000).strftime("%Y-%m-%d %I:%M:%S") }}</span>
        </p>
        <div class="image-box" v-for="(item,index) in  treeSpecsEntity" :key="index" >
          
          <img  :src="item.image" :alt="item.image" class="border"    height="300">
        </div>
        
       
  
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
      treeSpecsEntity: null,
    };
  },
    middleware: "auth",

  async created() {
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
          self.treeSpecsEntity = JSON.parse(self.tree.treeSpecsEntity.updates);
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
  margin-bottom: 150px;
  .banner {
    background-size: 100% 100%;
    background-repeat: no-repeat;
    min-height: 25vh;
    border-radius: 7px;
    filter: blur(8px);
    -webkit-filter: blur(8px);
    border: 2px solid white;
    width: 97.6%;
    position: absolute;
    top: 20px;
    left: 7px;
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
