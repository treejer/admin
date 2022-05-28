<template>
  <div class="container trees-admin">
    <div class="row pl-3 pr-3" v-if="trees">
      <div class="users over-flow-scroll col-12 col-xl-12 col-lg-11 offset-lg-1 offset-xl-1">
        <div class="header-tab position-relative pb-3">
          <div class="row">
            <div class="col-md-12 p-md-0">
              <p class="param-md">Overview</p>
              <p class="title-sm font-weight-bolder">{{ tabName }}</p>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-12 mb-3 pl-0">
            <ul class="">
              <li
                class="d-inline-block list-style-none pr-2 pb-2"
                v-for="(item, index) in tabs"
                :key="index"
              >
                <button
                  @click="setIndex(item.text, index)"
                  :class="tabsIndex === index ? 'btn-green' : 'btn-gray'"
                  :key="index"
                >
                  {{ item.text }}
                </button>
              </li>
            </ul>
          </div>
          <div v-show="tabsIndex === 0" class="row">
            <div class="col-12  ">
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
            <div class="col-12 col-md-12 mt-3 ">
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
                    <nuxt-link :to="`/trees/${data.value}`">
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
          <div v-show="tabsIndex === 1"  class="col-12">
            <div class="col-12 col-md-11 mt-5">
              <AdminMap type="trees" />
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
import AdminMap from "@/components/AdminMap";
export default {
  mixins: [Vue2Filters.mixin],
  components: {
    Fab,
    AdminMap,
  },
  name: "trees",
  layout: "dashboard",
  loading: false,
  data() {
    return {
      tabs: [
        {
          text: "Trees Funding Volume",
        },
        {
          text: "Trees Planing Volume",
        },
      ],
      tabsIndex: 0,
      tabName: "Trees Funding Volume",
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
             trees(first:999,orderBy: createdAt, orderDirection: desc)   {
                  id
	              	planter {id}
	              	
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
            self.trees = res.data.trees;
            

            self.trees.map((item, index) => {
              self.items.push({
                Number: index + 1,
                id: self.$hex2Dec(item.id),
                "Plant Date": self
                  .$moment(item.plantDate * 1000)
                  .strftime("%Y-%m-%d %I:%M:%S"),
                Planter: item.planter ? item.planter.id : null,
                TreeSpecsEntity:
                  item.treeSpecsEntity &&
                  item.treeSpecsEntity.latitude &&
                  item.treeSpecsEntity.longitude
                    ? item.treeSpecsEntity.latitude +
                      "," +
                      item.treeSpecsEntity.longitude
                    : "Empty",
                UpdatedAt: self
                  .$moment(item.updatedAt * 1000)
                  .strftime("%Y-%m-%d %I:%M:%S"),
                showDetail: item.id,
              });
            });
            console.log(self.items,"self.items is here")
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
    setIndex(item, index) {
      this.tabsIndex = index;
      this.tabName = item;
    },
  },
};
</script>
<style lang="scss" scoped>
.trees-admin {
  .btn-green {
    padding: 5.5px 35px;
  }
  .users{
    overflow: scroll;
    
  }

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
      font-size: 10px;
      line-height: auto;
      

      color: #424242;
    }
    .table thead {
      background: #e5e7db;
    }

    tr th {
      font-size: 10px;
      line-height: auto;
      color: #757575;
    }
    tr{
      td{
        padding: 2.5px;
      }
    }
    .btn-state-admin {
      padding: 5px 15px;

      border: none;
      border-radius: 6px;
    }
  }
}
</style>
