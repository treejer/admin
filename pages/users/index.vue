<template>
  <div class="container users-admin">
    <div class="row pl-3 pr-3">
      <div class="users col-12 col-xl-12 col-md-11 offset-md-1 offset-xl-0 ">
        <div class="row">
          <div class="col-12 py-3 pl-3">
            <h4 class="title-sm tr-gray-one text-left">Planters</h4>
            <div class="position-relative w-50 search-admin-user-box">
              <input
                class="search-admin-user"
                v-model="searchAdminUsers"
                placeholder="Search by name or walletaddress"
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
                    <th scope="col">Number</th>

                    <th scope="col">ID</th>

                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Name
                    </th>

                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Wallet
                    </th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>CreatedAt
                    </th>
                    <th class="pointer-event" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Status
                    </th>

                    <th class="pointer-event d-none d-md-block" scope="col">
                      <i class="pointer-event fas fa-sort-up"></i>Show detail
                    </th>
                  </tr>
                </thead>
                <tbody v-if="users">
                  <tr
                    v-for="(user, index) in filterBy(users, searchAdminUsers)"
                    :key="index"
                  >
                    <td scope="row">{{ index + 1 }}</td>
                    <td scope="row" v-if="user.user._id">
                      {{ user.user._id }}
                    </td>
                    <td>
                      <span>{{
                        user.user.firstName + " " + user.user.lastName
                      }}</span>
                    </td>
                    <td>
                      <span v-coin>{{ user.user.publicAddress }}</span>
                    </td>
                    <td>
                      <span>
                        {{
                          $moment(user.user.createdAt).strftime(
                            "%Y-%m-%d %I:%M:%S"
                          )
                        }}
                      </span>
                    </td>
                    <td>
                      <button
                        @click.prevent="sendVerifyAndReject(user)"
                        class="btn-state-admin"
                        :class="
                          user.user.isVerified ? 'btn-green' : 'btn-warning'
                        "
                      >
                        {{ user.user.isVerified ? "Verified" : "Pending" }}
                      </button>
                    </td>
                    <td class="d-none d-md-block">
                      <nuxt-link :to="`/users/${user.user._id}`">
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
import Vue2Filters from "vue2-filters";

export default {
  mixins: [Vue2Filters.mixin],

  name: "users",
  layout: "dashboard",
  loading: false,
  data() {
    return {
      users: null,
      searchAdminUsers: "",
    };
  },
  middleware: "auth",

  components: {
    Fab,
  },

  async mounted() {
    await this.getUsers();

    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      setTimeout(() => this.$nuxt.$loading.finish(), 500);
    });
  },

  methods: {
    async getUsers() {
      let self = this;
      self.loading = true;
      await this.$axios
        .$get(`${process.env.API_URL}/admin/users?filters={}`)
        .then((res) => {
          if (res.statusCode && res.statusCode === 400) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          } else {
            self.users = res;
            console.log(self.users, "self.users is here");
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
    async sendVerifyAndReject(user) {
      let self = this;
      self.loading = true;
      if (user.user.isVerified === false) {
        const res = await self.$axios.$patch(
          `${process.env.API_URL}/admin/verify?userid=${user.user._id}`
        );
        console.log(res, "res is here");
      }
      if (user.user.isVerified) {
        const res = await self.$axios.$patch(
          `${process.env.API_URL}/admin/reject?userid=${user.user._id}`
        );
        console.log(res, "res is here");
      }
      self.loading = false;
    },

  },
};
</script>
<style lang="scss" scoped>
.users-admin {
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
  @media (max-width:767px) {
    .search-admin-user-box{
      width: 100%!important;
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
      /* identical to box height */

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
