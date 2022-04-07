<template>
  <div class="container tempTrees-admin">
    <div class="row pl-3 pr-3">
      <div class="users col-12 col-xl-12 col-md-11 offset-md-1 offset-xl-0">
        <div class="row">
          <div class="col-12 py-3 pl-3">
            <h4 class="title-sm tr-gray-one text-left">Temp Trees</h4>
            <div class="position-relative w-50 search-admin-user-box">
              <input
                class="search-admin-user"
                placeholder="Search by Id or planter address"
              />
              <img
                src="~/assets/images/tree-profile/search.svg"
                alt="search"
                class="search-icon"
              />
            </div>
          </div>
          <div class="col-12 col-md-12 p-0">
            <div class="admin-user-table">
              <table class="table border-0 dir-ltr">
                <thead>
                  <tr>
                    <th scope="col">ID</th>

                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Submit Date
                    </th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Planter
                    </th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Nursery
                    </th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Location
                    </th>

                    <th class="pointer-event d-none d-md-block" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Show detail
                    </th>
                  </tr>
                </thead>
                <tbody v-if="tempTrees">
                  <tr v-for="(tree, index) in tempTrees" :key="index">
                    <td scope="row" v-if="tree">
                      {{ $hex2Dec(tree.id) }}
                    </td>
                    <td>
                      <span>{{
                        $moment(tree.createdAt * 1000).strftime(
                          "%Y-%m-%d %I:%M:%S"
                        )
                      }}</span>
                    </td>
                    <td>
                      <span v-coin>{{ tree.planter.id }}</span>
                    </td>
                    <td>
                      <span>
                        {{
                          tree.treeSpecsEntity
                            ? `${tree.treeSpecsEntity.nursery ? "YES" : "NO"}`
                            : "Epmty"
                        }}
                      </span>
                    </td>

                    <td>
                      <a
                        v-if="
                          tree.treeSpecsEntity &&
                          tree.treeSpecsEntity.longitude &&
                          tree.treeSpecsEntity.latitude
                        "
                        :href="`https://google.com/maps?q=loc:${tree.treeSpecsEntity.latitude / Math.pow(10, 6)},${tree.treeSpecsEntity.longitude / Math.pow(10, 6)}`"
                        target="_blank"
                      >
                        {{
                          `${tree.treeSpecsEntity.latitude / Math.pow(10, 6)},${tree.treeSpecsEntity.longitude / Math.pow(10, 6)}`
                        }}
                      </a>

                      <span v-else> Empty </span>
                    </td>

                    <!--<td>-->
                    <!--<button-->
                    <!--@click.prevent="sendVerifyAndReject(user)"-->
                    <!--class="btn-state-admin"-->
                    <!--:class="-->
                    <!--user.user.isVerified ? 'btn-green' : 'btn-warning'-->
                    <!--"-->
                    <!--&gt;-->
                    <!--{{ user.user.isVerified ? "Verified" : "Pending" }}-->
                    <!--</button>-->
                    <!--</td>-->
                    <td class="d-none d-md-block">
                      <nuxt-link :to="`/tempTrees/${$hex2Dec(tree.id)}`">
                        <button class="btn-state-admin btn-green">Info</button>
                      </nuxt-link>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div
                class="
                  tr-pagination
                  d-flex
                  justify-content-center
                  w-100
                  position-relative
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Fab from "@/components/font-awsome/Fab";
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],

  name: "tempTrees",
  layout: "dashboard",
  loading: false,
  data() {
    return {
      tempTrees: null,
      searchTempTrees: "",
      loadMore: 0,
    };
  },
  components: {
    Fab,
  },

  async mounted() {
    await this.getTempTress();

    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },

  methods: {
    async getTempTress() {
      let self = this;
      self.loading = true;
      await self.$axios
        .$post(`${process.env.GRAPHQL_URL}`, {
          query: `{
             tempTrees(first: 50, skip: ${self.loadMore}, orderBy: createdAt, orderDirection: desc)   {
                  id
	              	planter {id}
	              	status
	              	plantDate
	              	treeSpecsEntity{
                    latitude
                    longitude
                    nursery
                    locations
                  }
	              	createdAt
	              	updatedAt
             }
          }
          `,
        })
        .then((res) => {
          if (res.statusCode) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          } else {
            self.tempTrees = res.data.tempTrees;
            console.log(self.tempTrees, "self.tempTrees is here");
          }
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
    // async sendVerifyAndReject(user) {
    //   if (!confirm("Do you really want to change status?")) {
    //     return;
    //   }
    //
    //   let self = this;
    //
    //   const path = user.user.isVerified ? "reject" : "verify";
    //
    //   await self.$axios
    //     .$patch(
    //       `${process.env.API_URL}/admin/${path}?userid=${user.user._id}`,
    //       {},
    //       {
    //         headers: {
    //           Accept: "application/json",
    //           "x-auth-userid": this.$cookies.get("userId"),
    //           "x-auth-logintoken": this.$cookies.get("loginToken"),
    //         },
    //       }
    //     )
    //     .then((res) => {
    //       console.log(res, "res is here");
    //
    //       if (res.statusCode) {
    //         self.$bvToast.toast(res.code, {
    //           variant: "danger",
    //           title: "Forbidden",
    //           toaster: "b-toaster-bottom-left",
    //         });
    //       } else {
    //         this.$bvToast.toast(
    //           `User status successfully changed to ${
    //             user.user.isVerified ? "Rejected" : "Verified"
    //             }`,
    //           {
    //             variant: "success",
    //             title: "Update status successful",
    //             toaster: "b-toaster-bottom-left",
    //           }
    //         );
    //
    //         this.getUsers();
    //       }
    //     })
    //     .catch((err) => {
    //       console.log(err, "err is here");
    //
    //       self.$bvToast.toast(err.message, {
    //         variant: "danger",
    //         title: "Forbidden",
    //         toaster: "b-toaster-bottom-left",
    //       });
    //     });
    // },
  },
};
</script>
<style lang="scss" scoped>
.tempTrees-admin {
  .search-admin-user {
    min-width: 100%;
    background: #e5e7db;
    border: 2px solid #fff;
    box-sizing: border-box;
    border-radius: 18px;
    padding: 5px 15px;
    font-size: 14px;
  }
  .search-icon {
    position: absolute;
    right: 50px;
    top: 12px;
  }
  @media (max-width: 767px) {
    .search-admin-user-box {
      width: 100% !important;
    }
    .search-admin-user {
      font-size: 12px;
    }
    .search-icon {
      right: 5px;
      top: 8px;
    }
  }
  .admin-user-table {
    position: relative;
    border: 1px solid #bdbdbd;
    box-sizing: border-box;
    border-radius: 12px;
    margin-bottom: 150px;
    overflow-x: scroll;

    tr,
    td,
    th {
      border: none;
      font-size: 14px;
      line-height: 17px;

      color: #424242;
    }
    .table thead {
      background: #e5e7db;
    }

    tr th {
      font-size: 14px;
      line-height: 17px;
      color: #757575;
    }
    .btn-state-admin {
      padding: 5px 15px;

      border: none;
      border-radius: 6px;
    }
  }
}
</style>
