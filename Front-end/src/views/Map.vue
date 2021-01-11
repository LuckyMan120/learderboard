<template>
  <div class="map-wrapper grid grid-rows-1 grid-flow-col grid-cols-5">
    <!-- autocomplete section -->
    <div class="col-span-1 px-6 py-10">
      <div class="autocomplete-section flex items-center justify-between">
        <input
          v-model="location"
          v-on:keyup="findLocation"
          type="text"
          class="location-search w-96 m-0"
          placeholder="City, State or Zip Code"
        />
        <searchIcon class="m-0 w-10 h-10" />
      </div>
    </div>
    <!-- Mapbox section -->
    <GMap
      :disableUI="false"
      :zoom="4"
      mapType="roadmap"
      :markers="markers"
      :mapDidLoad="handleMapDidLoad"
    ></GMap>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import searchIcon from "@/assets/icons/search.svg";
import GMap from "@/components/Map/GMap";
import pins from "@/assets/json/map.json";

export default defineComponent({
  name: "Map",
  components: { searchIcon, GMap },
  setup() {
    const markers = pins.event;
    let geoCoderService = null;
    const location = ref("");

    // find lat, lng information based on address
    const findLocation = (e) => {
      if (e.keyCode === 13) {
        geoCoderService.geocode(
          { address: location.value },
          (results, status) => {
            if (status !== "OK") {
              alert("NO RESULT");
            } else {
              console.log(results);
            }
          }
        );
      }
    };

    // called when the map has finished loading
    const handleMapDidLoad = (map, GServices) => {
      console.log(map);
      console.log(GServices);
    };

    return {
      markers,
      location,
      findLocation,
      handleMapDidLoad,
    };
  },
});
</script>

<style>
.map-wrapper {
  height: calc(100vh - 56px);
}
.autocomplete-section {
  border-bottom: 1px solid #dad0cc;
}
.location-search:focus {
  outline: none;
}
</style>
