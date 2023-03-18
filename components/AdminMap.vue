<template>
  <GMap
    v-if="trees"
    ref="gMap"
    :center="{
      lat: Number(
        trees[0].treeSpecsEntity
          ? trees[0].treeSpecsEntity.longitude
          : trees[1].treeSpecsEntity.longitude
      ),
      lng: Number(
        trees[0].treeSpecsEntity
          ? trees[0].treeSpecsEntity.latitude
          : trees[1].treeSpecsEntity.longitude
      ),
    }"
    :cluster="{ options: { styles: mapConfigData.clusterStyle } }"
    :options="{
      fullscreenControl: true,
      streetViewControl: false,
      mapTypeControl: false,
      zoomControl: true,
      gestureHandling: 'cooperative',
      styles: mapConfigData.mapStyle,
    }"
    :zoom="5"
  >
    <GMapMarker
      v-for="(tree, index) in trees"
      :key="index"
      :options="{
        icon:
          tree === currentLocation
            ? mapConfigData.pins.selected
            : mapConfigData.pins.notSelected,
      }"
      :position="{
        lat: Number(
          tree.treeSpecsEntity ? tree.treeSpecsEntity.latitude : null
        ),
        lng: Number(
          tree.treeSpecsEntity ? tree.treeSpecsEntity.longitude : null
        ),
      }"
      @click="currentLocation = tree"
    >
      <GMapInfoWindow :options="{ maxWidth: 200 }">
        <nuxt-link :to="`tempTrees/${tree.id}`">
          <b>{{ tree.id }} </b>
          <br />
          <br />
          <code>
            Lat:
            {{
              Number(
                tree.treeSpecsEntity ? tree.treeSpecsEntity.latitude : null
              )
            }},
            <br />
            Lng:
            {{
              Number(
                tree.treeSpecsEntity ? tree.treeSpecsEntity.longitude : null
              )
            }}
          </code>
        </nuxt-link>
      </GMapInfoWindow>
    </GMapMarker>
  </GMap>
</template>

<script>
import mapConfig from "~/static/data/mapConfig.json";
export default {
  props: {
    type: {
      typ: String,
      default: "trees",
    },
  },
  data() {
    return {
      currentLocation: {},
      mapConfigData: mapConfig,
      trees: null,
    };
  },
  methods: {
    async getTrees() {
      let self = this;

      let queryUrl = self.type === "tempTrees" ? "tempTrees" : "trees";
      self.loading = true;
      await self.$axios
        .$post(`${self.$cookies.get('config').graphqlUrl}`, {
          query: `{
             ${queryUrl}(orderBy: createdAt, orderDirection: desc)   {
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
            if (res.data) {
              if (res.data.trees) {
                self.trees = res.data.trees;
              }
              if (res.data.tempTrees) {
                self.trees = res.data.tempTrees;
              }
            }

            console.log(self.trees, "self.trees is");
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
  mounted() {
    this.getTrees();
  },
};
</script>

<style>
</style>
