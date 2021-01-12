<template>
  <div class="map-wrapper grid grid-rows-1 grid-flow-col grid-cols-5">
    <!-- autocomplete section -->
    <div class="col-span-1 py-10 shadow">
      <!-- Search -->
      <TextInput
        class="mb-10 mx-6"
        v-model="location"
        @keyup="findLocation"
        @clearInput="clearInput"
        :inputFlag="inputFlag"
        placeholder="City, State or Zip Code"
        type="text"
      />

      <!-- List -->
      <List title="nearby" :items="listItems" @item-click="handleItemClick" />
    </div>

    <!-- Mapbox section -->
    <section class="col-span-4 relative flex justify-center items-start">
      <!-- Close btn -->
      <Button icon rounded class="absolute right-7 top-7 z-10">
        <template #icon>
          <router-link to="/">
            <CloseIcon fill="#451400" />
          </router-link>
        </template>
      </Button>

      <!-- Search btn -->
      <Button
        v-if="searchFlag"
        rounded
        class="absolute top-7 z-10"
        @click="searchArea"
      >
        search this area
      </Button>

      <div class="w-full">
        <GMap
          :disableUI="false"
          :zoom="zoom"
          :center="center"
          mapType="roadmap"
          :markers="markers"
          :mapDidLoad="handleMapDidLoad"
        ></GMap>
      </div>
    </section>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
// import searchIcon from '@/assets/icons/search.svg'
import CloseIcon from "@/assets/icons/cancel.svg";
import GMap from "@/components/Map/GMap";
import pins from "@/assets/json/map.json";

import Button from "@/components/Button/Button";
import TextInput from "@/components/TextInput/TextInput";
import List from "@/components/List/List";

let rad = function(x) {
  return (x * Math.PI) / 180;
};

export default defineComponent({
  name: "Map",
  components: { GMap, Button, CloseIcon, TextInput, List },
  setup() {
    const center = ref({ lat: 37.09024, lng: -95.712891 });
    const searchFlag = ref(false);
    const inputFlag = ref(false);
    const zoom = ref(6);
    const markers = ref([]);
    const localMarkers = pins.event;
    let geoCoderService = null;
    const location = ref("");
    const searchedPinsData = ref([]);
    const listItems = ref([]);

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

              // set searched location
              center.value = latlng;
              zoom.value = 8;

              // reset search value
              location.value = results[0].formatted_address;

              getNearestPins(latlng);
            }
          }
        );
      }
    };

    // click on item
    const handleItemClick = (id) => {
      alert("do stuff id " + id);
    };

    // search area
    const searchArea = () => {
      listItems.value = searchedPinsData.value;
      inputFlag.value = true;
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

      // update nearest pins list
      listItems.value = searchedPins;

      // save nearest pins
      searchedPinsData.value = searchedPins;

      // set search and input flag
      searchFlag.value = true;
      inputFlag.value = true;
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

    const clearInput = () => {
      listItems.value = [];
      inputFlag.value = false;
      location.value = "";
    };

    return {
      center,
      searchFlag,
      searchArea,
      inputFlag,
      zoom,
      clearInput,
      listItems,
      markers,
      localMarkers,
      location,
      findLocation,
      handleItemClick,
      handleMapDidLoad,
      searchedPinsData,
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
