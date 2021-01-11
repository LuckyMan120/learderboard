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

let rad = function(x) {
  return (x * Math.PI) / 180;
};

export default defineComponent({
  name: "Map",
  components: { searchIcon, GMap },
  setup() {
    const markers = ref([]);
    const localMarkers = pins.event;
    let geoCoderService = null;
    const location = ref("");
    const searchedPin = ref();

    // find lat, lng information based on address
    const findLocation = (e) => {
      if (e.keyCode === 13) {
        geoCoderService.geocode(
          { address: location.value },
          (results, status) => {
            if (status !== "OK") {
              alert("NO RESULT");
            } else {
              let latlng = results[0].geometry.location.toJSON();

              // set the searched pin
              searchedPin.value = results[0].geometry.location.toJSON();
              getNearestPins(latlng);
            }
          }
        );
      }
    };

    // called when the map has finished loading
    const handleMapDidLoad = (map, GServices) => {
      console.log(map);
      geoCoderService = new GServices.Geocoder();
    };

    // get closest pins by searched location
    const getNearestPins = (latlng) => {
      let searchedPins = [];
      localMarkers.forEach((marker) => {
        let distance = calDistance(latlng, {
          lat: marker.lat,
          lng: marker.long,
        });

        // select the pins within Max 1000KM
        if (parseFloat(distance) <= 1000) {
          searchedPins.push(marker);
        }
      });

      // update the searched pin
      markers.value = searchedPins;
    };

    // calculator direct distance
    const calDistance = (first, second) => {
      let R = 6378137;
      let dLat = rad(second.lat - first.lat);
      let dLong = rad(second.lng - first.lng);
      let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(rad(first.lat)) *
          Math.cos(rad(second.lat)) *
          Math.sin(dLong / 2) *
          Math.sin(dLong / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      return (d / 1000).toFixed(2);
    };

    return {
      markers,
      localMarkers,
      location,
      findLocation,
      handleMapDidLoad,
      searchedPin,
      calDistance,
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
