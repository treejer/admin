<template>
  <section class="sidebar pt-4 col-12 col-md-12 col-lg-1 col-xl-1">
    <ul class="nav flex-column">
      <li class="nav-item pointer-event dashboard" @click="changeIndex(0)">
        <nuxt-link to="/">
          <DashboardIcon
            :activeLogo="$store.state.index === 0 ? true : false"
          />
        </nuxt-link>
      </li>
      <li class="nav-item pointer-event users" @click="changeIndex(1)">
        <nuxt-link to="/users">
          <usersIcon :activeLogo="$store.state.index === 1 ? true : false" />
        </nuxt-link>
      </li>
      <li class="nav-item pointer-event temptrees" @click="changeIndex(2)">
        <nuxt-link to="/tempTrees">
          <TemptreesIcon
            :activeLogo="$store.state.index === 2 ? true : false"
          />
        </nuxt-link>
      </li>
      <li class="nav-item pointer-event temptrees" @click="changeIndex(3)">
        <nuxt-link to="/trees">
          <TreesIcon
            :activeLogo="$store.state.index === 3 ? true : false"
          />
        </nuxt-link>
      </li>
      <li class="nav-item pointer-event sheild" @click="changeIndex(4)">
        <nuxt-link to="/sheild">
          <SheildIcon :activeLogo="$store.state.index === 4 ? true : false" />
        </nuxt-link>
      </li>
    </ul>
  </section>
</template>

<script>
import usersIcon from "@/components/admin/usersIcon.vue";
import DashboardIcon from "./admin/dashboardIcon.vue";
import TemptreesIcon from "./admin/temptreesIcon.vue";
import TreesIcon from "./admin/TreesIcon.vue";
import SheildIcon from "./admin/sheildIcon.vue";

export default {
  name: "Sidebar",
  components: {
    usersIcon,
    DashboardIcon,
    TemptreesIcon,
    SheildIcon,
    TreesIcon,
  },
  data() {
    return {
      checkSidbar: true,
    };
  },
  async created() {
    if (await !this.$cookies.get("setSidebarIndex")) {
      this.$store.commit("SET_SIDEBAR_INDEX", 0);
    } else {
      await this.$store.commit(
        "SET_SIDEBAR_INDEX",
        this.$cookies.get("setSidebarIndex")
      );
    }
  },

  methods: {
    changeIndex(id) {
      if (!this.$cookies.get("loginToken")) {
        this.$router.push("/");
        this.$store.commit("SET_SIDEBAR_INDEX", 0);
      } else {
        this.$store.commit("SET_SIDEBAR_INDEX", id);
        this.$cookies.set("setSidebarIndex", id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  background: #ffffff;
  box-shadow: 4px 4px 44px rgba(0, 0, 0, 0.1);
  min-height: 100vh;
  text-align: center;
  position: fixed;
  top: 0;
  z-index: +999;
  border-radius: 0 20px 20px 0 ;
  ul {
    li {
      margin-bottom: 35px;
      position: relative;
      a {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        &:hover {
          cursor: pointer;
        }
      }
    }
  }
}
@media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
  /* CSS */
}
@media (max-width: 768px) {
  .sidebar {
    min-height: 10vh;
    text-align: center;
    position: relative;
    margin-top: 40px;
    margin-bottom: 40px;
    ul {
      display: flex;
      flex-direction: row !important;
      justify-content: space-around;
    }
  }
}
</style>
