<template>
  <GMap
    v-if="trees"
    ref="gMap"
    :center="{
      lat: Number(locations[0].lat),
      lng: Number(locations[0].lng),
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
      v-for="(tree ,index) in locations"
      :key="index"
      :options="{
        icon:
          tree === currentLocation
            ? mapConfigData.pins.selected
            : mapConfigData.pins.notSelected,
      }"
      :position="{
        lat: Number(tree.lat),
        lng: Number(tree.lng),
      }"
      @click="currentLocation = tree"
    >
      <GMapInfoWindow :options="{ maxWidth: 200 }">
        <nuxt-link :to="`tempTrees/0x${index}`">
          <b>{{ '0x'+index }} </b>
          <br />
          <br />
          <code>
            Lat:
            {{ Number(tree.lat) }},
            <br />
            Lng:
            {{ Number(tree.lng) }}
          </code>
        </nuxt-link>
      </GMapInfoWindow>
    </GMapMarker>
  </GMap>
</template>

<script>
import mapConfig from "~/static/data/mapConfig.json";
export default {
  data() {
    return {
      currentLocation: {},
      mapConfigData: mapConfig,
      trees: null,
      locations: [
        {
          lat: -37814,
          lng: 14496332,
        },
        {
          lat: -353075,
          lng: 1491244,
        },
        {
          lat: -372019,
          lng: 1449554,
        },
        {
          lat: -32612,
          lng: 1518,
        },
        {
          lat: -339,
          lng: 1512,
        },
      ],
    };
  },
  methods: {
    async getTrees() {
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
            console.log(
              Number(self.trees[0].treeSpecsEntity.latitude),
              " Number(self.trees[0].treeSpecsEntity.latitude) is here"
            );

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
    for (let i = 0; i <= 90; i++) {
      this.locations.push({
        lat:  (Math.random()*360-180).toFixed(8),
        lng: (Math.random()*180-90).toFixed(8),
      });
    }
    console.log(this.locations, "locations is");
  },
};
</script>

<style>
</style>
