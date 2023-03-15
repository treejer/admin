<template>
  <div class="container user-page-details" v-if="tree">
    <div class="row">
      <div class="col-12 mb-5 over-flow-scroll col-12 col-xl-12 col-lg-11 offset-lg-1 offset-xl-1">
        <div class="
            mt-5
            font-weight-bolder
            param-gray-two
            user-detail-main
            position-relative
            over-flow-hidden
            w-100
          ">
          <div class="edit-button text-capitalize" v-if="tree.lastUpdate && tree.lastUpdate.updateStatus == '1'" >
            <button :class="{ disable: loading.verify }" class="btn-green-md mt-1 mb-1" @click="verifyUpdate(true)">
              <BSpinner v-if="loading.verify" class="mr-2" small type="grow">loading.verify</BSpinner>
              Verify Update
            </button>

            <button :class="{ disable: loading.reject }" class="btn-gray mt-1 mb-1" @click="verifyUpdate(false)">
              <BSpinner v-if="loading.reject" class="mr-2" small type="grow">loading.reject</BSpinner>
              Reject Update
            </button>
          </div>

          <h2 class="title tr-gray-two mb-md-4 font-weight-bolder">
            Tree Info
          </h2>

          <p>
            ID: <span>{{ `${$hex2Dec(tree.id)} - hex: ${tree.id}` }}</span>
          </p>

          <img v-if="tree.treeSpecsEntity && tree.treeSpecsEntity.imageFs" :key="`${tree.treeSpecsEntity.imageHash}`" width="400px"
              :src="tree.treeSpecsEntity.imageFs" :alt="`${tree.treeSpecsEntity.imageHash}`" />

          <p v-if="tree.funder">
            Funder: <span>{{ tree.funder.id }}</span>
          </p>

          <p>
            Birth date:
            <span>{{
                $moment(tree.birthDate * 1000).strftime("%Y-%m-%d %I:%M:%S")
            }}</span>
          </p>
          <p>
            Country Code: <span>{{ tree.countryCode }}</span>
          </p>
          <p>
            CreatedAt:
            <span>{{
                $moment(tree.createdAt * 1000).strftime("%Y-%m-%d %I:%M:%S")
            }}</span>
          </p>

          <p>
            Plant date:
            <span>{{
                $moment(tree.plantDate * 1000).strftime("%Y-%m-%d %I:%M:%S")
            }}</span>
          </p>
          <p v-if="tree.planter">
            Planter: <span>{{ tree.planter.id }}</span>
          </p>

          <div v-if="planterData && planterData.user">
            <p>
              Planter Name:
              <a :href="`/users/${planterData.user._id}`" target="_blank">{{
                  planterData.user.firstName + " " + planterData.user.lastName
              }}</a>
            </p>
          </div>

          <p>
            Status:
            <span>{{ tree.treeStatus }}</span>
          </p>
          <p>
            TreeSpecs:
            <span><a :href="`https://ipfs.treejer.com/ipfs/${tree.treeSpecs}`" target="_blank">{{ tree.treeSpecs }}</a>
            </span>
          </p>

          <h4>Tree Specs Entity:</h4>
          <div v-if="tree.treeSpecsEntity">
            <p>
              <a :href="`https://google.com/maps?q=loc:${tree.treeSpecsEntity.latitude / Math.pow(10, 6)
              },${tree.treeSpecsEntity.longitude / Math.pow(10, 6)}`" target="_blank">
                {{
                    `${tree.treeSpecsEntity.latitude / Math.pow(10, 6)},${tree.treeSpecsEntity.longitude / Math.pow(10, 6)
                    }`
                }}
              </a>
            </p>

            <p>Nursery: {{ tree.treeSpecsEntity.nursery ? "Yes" : "No" }}</p>

            


            <p v-if="tree.treeSpecsEntity.locations.length > 0">
              Locations: 


              <a v-for="(location, index) in tree.treeSpecsEntity.locations" :key="`treeSpecsEntity-location-${index}`"
              
              :href="`https://google.com/maps?q=loc:${location.latitude / Math.pow(10, 6)
              },${location.longitude / Math.pow(10, 6)}`" target="_blank">
                {{
                    `${location.latitude / Math.pow(10, 6)},${location.longitude / Math.pow(10, 6)
                    }`
                }}
              </a>

            </p>

            <img v-for="(update, index) in tree.treeSpecsEntity.updates" :key="`update-${index}`" width="400px"
              :src="update.image" :alt="`update-${index}`" />

            


          </div>

          <hr>

          <h4 v-if="tree.lastUpdate">Last Update:</h4>
          
          <div v-if="tree.lastUpdate && tree.lastUpdate.updateSpecEntity">

          <p>Status:   {{ tree.lastUpdate.updateStatus + " " + (tree.lastUpdate.updateStatus == '1' ? 'Pending' : (tree.lastUpdate.updateStatus == '3' ? 'Accepted': 'Rejected') )  }}</p>


          <p>
            Created At:
            <span>{{
                $moment(tree.lastUpdate.createdAt * 1000).strftime("%Y-%m-%d %I:%M:%S")
            }}</span>
          </p>

            <p>
              <a :href="`https://google.com/maps?q=loc:${tree.lastUpdate.updateSpecEntity.latitude / Math.pow(10, 6)
              },${tree.lastUpdate.updateSpecEntity.longitude / Math.pow(10, 6)}`" target="_blank">
                {{
                    `${tree.lastUpdate.updateSpecEntity.latitude / Math.pow(10, 6)},${tree.lastUpdate.updateSpecEntity.longitude / Math.pow(10, 6)
                    }`
                }}
              </a>
            </p>

            <p>Nursery: {{ tree.lastUpdate.updateSpecEntity.nursery ? "Yes" : "No" }}</p>

             <p>
              UpdateSpecs On IPFS
              <span><a :href="`https://ipfs.treejer.com/ipfs/${tree.lastUpdate.updateSpecs}`" target="_blank">{{ tree.lastUpdate.updateSpecs }}</a>
              </span>
            </p>

            <img v-for="(update, index) in tree.lastUpdate.updateSpecEntity.updates" :key="`update-updates-${index}`" width="400px"
              :src="update.image" :alt="`update-${index}`" />

           

            <p v-if="tree.lastUpdate.updateSpecEntity.locations.length > 0">
              Locations: 


              <a v-for="(location, index) in tree.lastUpdate.updateSpecEntity.locations" :key="`update-location-${index}`"
              
              :href="`https://google.com/maps?q=loc:${location.latitude / Math.pow(10, 6)
              },${location.longitude / Math.pow(10, 6)}`" target="_blank">
                {{
                    `${location.latitude / Math.pow(10, 6)},${location.longitude / Math.pow(10, 6)
                    }`
                }}
              </a>

            </p>


          </div>


        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TreeFactoryABI from "~/static/abis/TreeFactory.json";

export default {
  name: "tempTree",
  layout: "dashboard",
  data() {
    return {
      tree: null,
      icon: process.env.GRAVATAR,
      loading: {
        verify: false,
        reject: false,
      },
      planterData: null,
    };
  },
  async created() {
    console.log(this, "this is here");
    await this.getTree();

    await this.getPlanterData();
  },
  methods: {
    async getPlanterData() {
      let self = this;

      if (
        !this.tree ||
        !this.tree.planter ||
        !this.$cookies.get("loginToken") ||
        !this.$cookies.get("userId")
      ) {
        return;
      }

      await this.$axios
        .$get(
          `${process.env.API_URL}/admin/users-by-wallet/${this.tree.planter.id}`,
          {
            headers: {
              Accept: "application/json",
              "x-auth-userid": this.$cookies.get("userId"),
              "x-auth-logintoken": this.$cookies.get("loginToken"),
            },
          }
        )
        .then((result) => {
          console.log(result, "result is here");

          self.planterData = result;
        })
        .catch((err) => {
          console.log(err, "err is here");
        });
    },

    async verifyUpdate(status) {
      let self = this;

      const type = status ? "verify" : "reject";

      this.loading[type] = true;

      if (!confirm("Are you sure? This transaction is irreversible!")) {
        this.loading[type] = false;
        return;
      }

      let account = this.$cookies.get("account");

      this.$web3.currentProvider.enable();

      try {
        const TreeFactory = new this.$web3.eth.Contract(
          TreeFactoryABI,
          this.$cookies.get('config').contractTreeFactory
        );

        const tx = TreeFactory.methods.verifyUpdate(this.tree.id, status);
        let gas = await tx.estimateGas({ from: account });

        const receipt = await this.$web3.eth
          .sendTransaction({
            from: account,
            to: TreeFactory._address,
            value: 0,
            data: tx.encodeABI(),
            gas: gas,
            type: "0x2",
            maxPriorityFeePerGas: null,
            maxFeePerGas: null,
          })
          .on("transactionHash", (transactionHash) => {
            self.$bvToast.toast(["Check progress on Etherscan"], {
              toaster: "b-toaster-bottom-left",
              title: "Processing transaction...",
              variant: "warning",
              href: `${process.env.etherScanUrl}/tx/${transactionHash}`,
              bodyClass: "fund-error",
              noAutoHide: true,
            });
          })
          .on("error", (error) => {
            console.log(error, "errorr");
            if (error.code === 32602) {
              self.$bvToast.toast(["You don't have enough Ether (ETH)"], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            } else if (error.code === -32602) {
              //do nothing
            } else {
              self.$bvToast.toast([error.message.substring(0, 100)], {
                toaster: "b-toaster-bottom-left",
                title: "Transaction failed",
                variant: "danger",
                href: `${process.env.etherScanUrl}/tx/${transactionHash}`,
                noAutoHide: true,
                bodyClass: "fund-error",
              });
            }
          });

        if (receipt && receipt.transactionHash) {
          this.$bvToast.toast(
            ["Tree Update" + (status ? "Verified" : "Rejected") + " successfuly"],
            {
              toaster: "b-toaster-bottom-left",
              title: "Transaction is successful",
              variant: "success",
              href: `${process.env.explorerUrl}/tx/${receipt.transactionHash}`,
            }
          );

          this.planterStatus = 1;
        }
      } catch (error) {
        console.log(error, "errorr");

        self.$bvToast.toast([error.message.substring(0, 100)], {
          toaster: "b-toaster-bottom-left",
          title: "Error occured!",
          variant: "danger",
          noAutoHide: true,
          bodyClass: "fund-error",
        });
      }

      this.loading[type] = false;
    },
    async getTree() {
      let self = this;
      await self.$axios
        .$post(`${process.env.GRAPHQL_URL}`, {
          query: `{
             tree(id: "${this.$dec2hex(self.$route.params.id)}"){
            id
            planter {
              id
            }
            funder {
              id
            }
            countryCode
             treeStatus
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
            lastUpdate {
              updateStatus
              updateSpecs
              updateSpecEntity {
                updates
                longitude
                latitude
                nursery
                locations
              }
              createdAt
            }
          }
        }`,
        })
        .then((res) => {
          self.tree = res.data.tree;
          console.log(self.tree, "self.tree is here");

          if (
            res.data.tree.treeSpecsEntity
            
          ) {

            if(res.data.tree.treeSpecsEntity.updates) {
              self.tree.treeSpecsEntity.updates = JSON.parse(
                res.data.tree.treeSpecsEntity.updates
              );
            }

            if(res.data.tree.treeSpecsEntity.locations) {
              self.tree.treeSpecsEntity.locations = JSON.parse(
                res.data.tree.treeSpecsEntity.locations
              );
            }
            
          }

          if (
            res.data.tree.lastUpdate
            
          ) {

            if(res.data.tree.lastUpdate.updateSpecEntity) {

              if(res.data.tree.lastUpdate.updateSpecEntity.updates) {
                self.tree.lastUpdate.updateSpecEntity.updates = JSON.parse(
                  res.data.tree.lastUpdate.updateSpecEntity.updates
                );
              }

              if(res.data.tree.lastUpdate.updateSpecEntity.locations) {
                self.tree.lastUpdate.updateSpecEntity.locations = JSON.parse(
                  res.data.tree.lastUpdate.updateSpecEntity.locations
                );
              }

            }

            
            
          }

          

        })
        .catch((err) => {
          self.$bvToast.toast(err.message, {
            variant: "danger",
            title: "Forbidden",
            toaster: "b-toaster-bottom-left",
          });
        })
        .finally();
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
