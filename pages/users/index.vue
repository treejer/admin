<template>
  <div class="container">
    <div class="row pl-3 pr-3">
      <div class="users col-12">
        <div class="row">
          <div class="col-12 py-3 pl-3">
            <h4 class="title-sm tr-gray-one text-left">Planters</h4>
          </div>
          <div class="col-12 col-md-12 p-0">
            <div class="admin-user-table">
              <table class="table border-0 dir-ltr">
                <thead>
                  <tr>
                    <th scope="col">Tree ID</th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Owner
                    </th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Status
                    </th>
                    <th class="pointer-event d-none d-md-block" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Location
                    </th>
                  </tr>
                </thead>
                <tbody v-if="trees">
                  <tr v-for="tree in trees" :key="tree.id">
                    <th scope="row">{{ $hex2Dec(tree.id) }}</th>
                    <td v-coin>
                      {{ tree.funder !== null ? tree.funder.id : "-" }}
                    </td>
                    <td>
                      {{ tree.treeStatus }}
                    </td>
                    <td class="d-none d-md-block">
                      {{ tree.latitude + "," + tree.longitude }}
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
              >
                <!-- <pagination
                  size="small"
                  align="center"
                  :limit="2"
                  :data="trees"
                  @pagination-change-page="listTrees"
                ></pagination> -->
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Fab from "@/components/font-awsome/Fab";

export default {
  name: "users",
  layout: "dashboard",
  loading: false,
  data() {
    return {};
  },

  components: {
    Fab,
  },

  mounted() {
    this.getUsers();
    console.log(
      this.$cookies.get("userId"),
      "this.$store.state.userId.userId i shere"
    );
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },

  methods: {
    async getUsers() {

      let self = this;

      await this.$axios
        .$get(
          process.env.API_URL + "/admin/users?filters={}",
          {
            headers: {
              "Accept": "application/json",
              "x-auth-userid": this.$cookies.get("userId"),
              "x-auth-logintoken": this.$cookies.get("loginToken"),
            },
          }
        )
        .then((res) => {

          if(res.statusCode && res.statusCode === 400) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          }

        }).catch((err) => {

          self.$bvToast.toast(res.message, {
            variant: "danger",
            title: "Forbidden",
            toaster: "b-toaster-bottom-left",
          });
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.users {
  position: relative;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 12px;
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
  table {
    justify-content: center;
    text-align: center;
  }
  tr th {
    font-size: 14px;
    line-height: 17px;
    /* identical to box height */

    color: #757575;
  }
  .btn-state-admin {
    padding: 5px 15px;

    background: #b6677f;
    border-radius: 6px;
  }
}
</style>
