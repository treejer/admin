<template>
  <div class="container users-admin" v-if="users">
    <div class="row">
      <div class="users col-12 col-xl-12 col-lg-11 offset-lg-1 offset-xl-0">
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
          <div class="col-12 col-md-12 mt-4">
            <div class="admin-user-table">
              <b-table
                striped
                :current-page="currentPage"
                :per-page="perPage"
                :items="items"
                hover
                :filter="searchAdminUsers"
                :fields="fields"
                id="tree-table"
                class="param tr-gray-three"
              >
                <template #cell(Wallet)="data">
                  <span v-coin>{{ data.value }}</span>
                </template>
                <template #cell(Status)="data">
                  <button
                    class="btn-state-admin"
                    :class="data.value ? 'btn-green' : 'btn-warning'"
                  >
                    {{ data.value ? "Accept" : "Pending" }}
                  </button>
                </template>
                <template #cell(showDetail)="data">
                  <nuxt-link :to="`/users/${data.value}`">
                    <button class="btn-state-admin btn-green">Info</button>
                  </nuxt-link>
                </template>
              </b-table>
            </div>
            <b-pagination
              class=""
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="perPage"
              align="fill"
              size="sm"
              aria-controls="tree-table"
            ></b-pagination>
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
      perPage: 20,

      currentPage: 1,
      trees: null,
      searchAdminUsers: "",
      fields: [
        { key: "Number" },
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
        {
          key: "Wallet",
          sortable: true,
        },
        {
          key: "CreatedAt",
          sortable: true,
        },
        {
          key: "Status",
        },

        {
          key: "showDetail",
          lable: "Show detail",
        },
      ],
      items: [],
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

      if (this.users) {
        this.$nuxt.$loading.finish();
      }
    });
  },
  computed: {
    totalRows() {
      if (this.users) {
        return this.users.length;
      }
    },
  },

  methods: {
    async getUsers() {
      let self = this;
      self.loading = true;
      await this.$axios
        .$get(`${process.env.API_URL}/admin/users?filters={}`, {
          headers: {
            Accept: "application/json",
            "x-auth-userid": self.$cookies.get("userId"),
            "x-auth-logintoken": self.$cookies.get("loginToken"),
          },
        })
        .then((res) => {
          if (res.statusCode) {
            self.$bvToast.toast(res.code, {
              variant: "danger",
              title: "Forbidden",
              toaster: "b-toaster-bottom-left",
            });
          } else {
            self.users = res;
            self.users.map((item, index) => {
              self.items.push({
                Number: index + 1,
                id: item.user._id,
                name: item.user.firstName + " " + item.user.lastName,
                Wallet: item.user.publicAddress,
                CreatedAt: self
                  .$moment(item.user.createdAt)
                  .strftime("%Y-%m-%d %I:%M:%S"),
                Status: item.user.isVerified,
                showDetail: item.user._id,
              });
            });
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
    top: 9px;
  }
  @media (max-width: 768px) {
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
    margin-bottom: 25px;
    overflow-x: scroll;

    tr,
    td,
    th {
      border: none;
      font-size: 14px;
      line-height: 17px;
      white-space: nowrap;
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
