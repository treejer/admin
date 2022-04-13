<template>
  <div class="container trees-admin">
    <div class="row pl-3 pr-3" v-if="trees">
      <div class="users col-12 col-xl-12 col-lg-11 offset-lg-1 offset-xl-0">
        <div class="row">
          <div class="col-12 py-3 pl-3">
            <h4 class="title-sm tr-gray-one text-left">Trees</h4>
            <div class="position-relative w-50 search-admin-user-box">
              <input
                class="search-admin-user"
                v-model="searchAdminUsers"
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
              <b-table
                striped
                :current-page="currentPage"
                :per-page="perPage"
                :items="items"
                class="param tr-gray-three"
                hover
                :filter="searchAdminUsers"
                :fields="fields"
                id="tree-table"
              >
                <template #cell(Planter)="data">
                  <span v-coin>{{ data.value }}</span>
                </template>
                <template #cell(showDetail)="data">
                  <nuxt-link :to="`/tempTrees/${data.value}`">
                    <button class="btn-state-admin btn-green">Info</button>
                  </nuxt-link>
                </template>
              </b-table>
            </div>
            <b-pagination
              class="mt-4"
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

  name: "trees",
  layout: "dashboard",
  loading: false,
  data() {
    return {
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
          key: "Plant Date",
          sortable: true,
        },
        {
          key: "Planter",
          sortable: true,
        },
        {
          key: "TreeSpecsEntity",
          sortable: true,
        },
        {
          key: "UpdatedAt",
          sortable: true,
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
    await this.getTress();

    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      if (this.trees) {
        this.$nuxt.$loading.finish();
      } else {
        this.$nuxt.$loading.fail();
      }
    });
  },
  computed: {
    totalRows() {
      if (this.trees) {
        return this.trees.length;
      }
    },
  },

  methods: {
    async getTress() {
      let self = this;
      self.loading = true;
      await self.$axios
        .$post(`${process.env.GRAPHQL_URL}`, {
          query: `{
             tempTrees(orderBy: createdAt, orderDirection: desc)   {
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
            self.trees = res.data.tempTrees;

            self.trees.map((item, index) => {
              self.items.push({
                Number: index + 1,
                id: self.$hex2Dec(item.id),
                "Plant Date": self
                  .$moment(item.plantDate * 1000)
                  .strftime("%Y-%m-%d %I:%M:%S"),
                Planter: item.planter.id,
                TreeSpecsEntity:item.treeSpecsEntity && item.treeSpecsEntity.latitude &&  item.treeSpecsEntity.longitude ? item.treeSpecsEntity.latitude +"," +item.treeSpecsEntity.longitude: "Empty",
                UpdatedAt: self
                  .$moment(item.updatedAt * 1000)
                  .strftime("%Y-%m-%d %I:%M:%S"),
                showDetail: item.id,
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
.trees-admin {
  
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
    // margin-bottom: 150px;
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
