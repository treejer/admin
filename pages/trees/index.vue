<template>
  <div class="container trees-admin">
    <div class="row pl-3 pr-3" v-if="items">
      <div
        class="users over-flow-scroll col-12 col-xl-12 col-lg-11 offset-lg-1 offset-xl-1"
      >
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
            <div class="position-relative col-md-6 search-admin-user-box">
              <!-- <input class="search-admin-user" v-model="searchAdminUsers"
                  placeholder="Search by Id or planter address" @keyup.enter="searchAdminUsers" />
                <img src="~/assets/images/tree-profile/search.svg" alt="search" class="search-icon" /> -->

              <input
                class="search-admin-user"
                v-model="query.planter"
                placeholder="Planter Adress"
                @change="filterTrees()"
              />
              <img
                src="~/assets/images/tree-profile/search.svg"
                alt="search"
                class="search-icon"
              />
            </div>
            <div class="col-md-6 justify-content-end">
              <div class="param tr-gray-three w-100 text-right pr-md-5 ">
                <span class="font-weight-bolder">Have Update</span>
                <select
                  class="bg-gray select-box-have-update tr-gray-four"
                  v-model="query.haveUpdate"
                  @change="filterTrees()"
                >
                  <option value="0">All</option>
                  <option value="1">Yes</option>
                  <option value="2">No</option>
                </select>
              </div>
            </div>
            <div class="col-12 col-md-12 p-lg-0 p-md-3">
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
                    <span>{{ data.value }}</span>
                  </template>
                  <template #cell(showDetail)="data">
                    <nuxt-link :to="`/trees/${data.value}`">
                      <button class="btn-state-admin btn-green">Info</button>
                    </nuxt-link>
                  </template>
                </b-table>
              </div>
              <b-pagination
                class="mt-4 "
                v-model="currentPage"
                :total-rows="skip"
                :per-page="perPage"
                align="fill"
                size="sm"
              >
              </b-pagination>
              <div
                v-if="skip <= 20"
                class="d-flex justify-content-center position-relative arrows-box"
              >
                <button
                  :style="`width : 175px;left:19.9%`"
                  class="pointer-event"
                  @click.prevent="prePage()"
                >
                  Pre
                </button>
                <button
                  :style="`width : 175px;left:66.8%`"
                  class="pointer-event"
                  @click.prevent="nextPage()"
                >
                  Next
                </button>
              </div>
              <div
                v-else-if="skip <= 60"
                class="d-flex justify-content-center position-relative arrows-box"
              >
                <button
                  :style="`width :200px;left: 10%`"
                  class="pointer-event"
                  @click.prevent="prePage()"
                >
                  Pre
                </button>
                <button
                  :style="`width : 200px;left: 66%`"
                  class="pointer-event"
                  @click.prevent="nextPage()"
                >
                  Next
                </button>
              </div>
              <div
                v-else-if="skip >= 60"
                class="d-flex justify-content-center position-relative arrows-box"
              >
                <button
                  :style="`width :114px;left: 11.2%`"
                  class="pointer-event"
                  @click.prevent="prePage()"
                >
                  Pre
                </button>
                <button
                  :style="`width : 114px;left: 78.2%`"
                  class="pointer-event"
                  @click.prevent="nextPage()"
                >
                  Next
                </button>
              </div>
              <div
                v-else
                class="d-flex justify-content-center position-relative arrows-box"
              >
                <button
                  :style="`width :175px;left:10%`"
                  class="pointer-event"
                  @click.prevent="prePage()"
                >
                  Pre
                </button>
                <button
                  :style="`width :175px;left:75%`"
                  class="pointer-event"
                  @click.prevent="nextPage()"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
          <div v-show="tabsIndex === 1" class="col-12">
            <!-- <div class="col-12 col-md-11 mt-5">
              <AdminMap type="trees" />
            </div> -->
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
          text: "Trees List",
        },
        {
          text: "Trees On Map",
        },
      ],
      tabsIndex: 0,
      tabName: "Trees List",
      perPage: 20,
      currentPage: 1,
      skip: 0,
      trees: null,
      searchAdminUsers: "",
      fields: [
        {
          key: "id",
          label: "ID",
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
          key: "LastUpdateAt",
          sortable: true,
        },
        {
          key: "CreatedAt",
          sortable: true,
        },
        {
          key: "showDetail",
          lable: "Show detail",
        },
      ],
      items: [],
      query: {
        haveUpdate: 0,
      },
    };
  },
  middleware: "auth",

  async mounted() {
    await this.getTress();
    // this.skip = this.trees.length
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
      if (this.items) {
        this.$nuxt.$loading.finish();
      } else {
        this.$nuxt.$loading.fail();
      }
    });
  },
  computed: {},

  methods: {
    async filterTrees() {
      this.skip = 0;
      this.currentPage = 1;
      this.perPage = 20;

      await this.getTress();
    },
    async getTress() {
      let self = this;
      self.loading = true;

      let whereQuery = "";
      if (this.query.haveUpdate == 1) {
        whereQuery += `lastUpdate_not: null`;
      }

      if (this.query.planter) {
        whereQuery += `, planter: "${this.query.planter.toLowerCase()}"`;
      }

      if (whereQuery != "") {
        whereQuery = `{${whereQuery}}`;
      }

      await self.$axios
        .$post(`${process.env.GRAPHQL_URL}`, {
          query: `{
             trees(first:${self.currentPage * self.perPage},skip:${
            self.skip
          },orderBy: createdAt, orderDirection: desc ${
            whereQuery ? `,where: ${whereQuery}` : ""
          }) {
                  id
	              	planter {id}
	              	plantDate
	              	treeSpecsEntity{
                    latitude
                    longitude
                    nursery
                    locations
                  }
                  lastUpdate {
                    updateStatus
                    updateSpecs
                    createdAt
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
            console.log(res.data.trees, "res.data.trees is here");
            self.items = [];
            res.data.trees.map((item, index) => {

              const treeId = self.$hex2Dec(item.id);
              self.items.push({
                Number: index + 1,
                id: treeId,
                Planter: item.planter ? item.planter.id.slice(0, 5) + '...' + item.planter.id.slice(-5) : null,
                TreeSpecsEntity:
                  item.treeSpecsEntity &&
                  item.treeSpecsEntity.latitude &&
                  item.treeSpecsEntity.longitude
                    ? item.treeSpecsEntity.latitude +
                      "," +
                      item.treeSpecsEntity.longitude
                    : "Empty",
                LastUpdateAt: item.lastUpdate
                  ? item.lastUpdate.updateStatus + "- " +self
                      .$moment(item.lastUpdate.createdAt * 1000)
                      .strftime("%Y-%m-%d %I:%M")
                  : "-",
                CreatedAt: self
                  .$moment(item.createdAt * 1000)
                  .strftime("%Y-%m-%d %I:%M:%S"),
                showDetail: treeId
              });
            });

            console.log(self.items, "self.items is here");
            this.$forceUpdate();
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
    nextPage() {
      this.currentPage++;
      this.skip = this.currentPage * this.perPage;
      console.log(this.skip, "this.skip");
      this.getTress();
    },
    prePage() {
      this.currentPage--;
      this.skip = this.currentPage * this.perPage;
      console.log(this.skip, "this.skip");
      this.getTress();
    },
  },
  watch: {},
};
</script>
<style lang="scss" scoped>
.trees-admin {
  .arrows-box {
    button {
      background: #faf8f1;
      position: absolute;
      width: 175px;
      padding-bottom: 3px;
      border: solid 1px lightgray;
      top: -46px;
      z-index: +9999;

      color: #545454;
    }

    #next {
      left: 66.8%;
    }

    #nexts {
      left: 78.2%;
      width: 114px;
    }

    #pre {
      left: 16.8%;
    }

    #pres {
      left: 10.9%;
      width: 114px;
    }
  }

  .btn-green {
    padding: 5.5px 35px;
  }

  .users {
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
  .select-box-have-update {
    background: #e5e7db;
    border: 2px solid #fff;
    border-radius: 6px;
    padding: 5px 10px;
    option {
    }
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

    tr {
      td {
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
