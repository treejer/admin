import { BToast } from "bootstrap-vue";

export default function ({ store, redirect }) {
  // If the user is not authenticated
  if (!store.$cookies.get("loginToken")) {
    const toast = new BToast();
    toast.$bvToast.toast("First sign your wallet", {
      toaster: "b-toaster-bottom-left",
      variant: "danger",
      noAutoHide: true,
      bodyClass: "fund-error",
    });
    store.commit("SET_SIDEBAR_INDEX", 0);
    
    redirect("/");
  }
  return null;
}
