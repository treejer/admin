<template>
  <div class="container users-admin">
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
                  <tr v-for="(user, index) in users" :key="index">
                    <td scope="row">{{ index + 1 }}</td>
                    <td scope="row">
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

export default {
  name: "users",
  layout: "dashboard",
  loading: false,
  data() {
    return {
      users: null,
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

      await this.$axios
        .$get(process.env.API_URL + "/admin/users?filters={}", {
          headers: {
            Accept: "application/json",
            "x-auth-userid": this.$cookies.get("userId"),
            "x-auth-logintoken": this.$cookies.get("loginToken"),
          },
        })
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
        });
    },
    async sendVerifyAndReject(user) {
      if (!confirm("Do you really want to change status?")) {
        return;
      }

      let self = this;

      const path = user.user.isVerified ? "reject" : "verify";

      await self.$axios
        .$patch(
          `${process.env.API_URL}/admin/${path}?userId=${user.user._id}`,
          {},
          {
            headers: {
              Accept: "application/json",
              "x-auth-userid": this.$cookies.get("userId"),
              "x-auth-logintoken": this.$cookies.get("loginToken"),
            },
          }
        )
        .then((res) => {
          console.log(res, "res is here");

          if (res.statusCode && res.statusCode === 400) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          } else {
            this.$bvToast.toast(
              `User status successfully changed to ${
                user.user.isVerified ? "Rejected" : "Verified"
              }`,
              {
                variant: "success",
                title: "Update status successful",
                toaster: "b-toaster-bottom-left",
              }
            );

            this.getUsers();
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
  },
};
</script>
<style lang="scss" scoped>
.admin-user-table {
  position: relative;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  border-radius: 12px;
  margin-bottom: 150px;
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
</style>
