<template>
  <div :class="$route.name" style="min-height: 100vh">
    <DashboardHeader/>
    <div class="container-fluid p-md-0" :class="$route.name"  style="min-height: 85vh">
      <div class="row">
        <Sidebar />
        <nuxt />
      </div>
    </div>
    <Footer />
  </div>
</template>

<style lang="scss"></style>
<script>
import DashboardHeader from "../components/DashboardHeader";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";

export default {
  components: { Sidebar, Footer, DashboardHeader },
  middleware: 'queryParamToCookie',
  created() {
    if(this.$nuxt.isOffline){
      this.$bvToast.toast(['Please check your connection'], {
        toaster: 'b-toaster-bottom-left',
        title: 'Connection is broked',
        variant: 'danger',
        noAutoHide: true,
        bodyClass: 'fund-error'
      })
    }
  },
};
</script>
