<template>
  <div class="map-wrapper">
    <!-- Mapbox section -->
    <GoogleMap
      api-key="AIzaSyDoi0kDoetjxsvsctCrRb99I5lu1GJMj_8"
      :center="center"
      :zoom="zoom"
      map-type-id="roadmap"
      class="map-wrapper"
      :options="mapStyle"
    >
      <Marker :options="{ position: center }" />
    </GoogleMap>
  </div>
</template>

<script>
import { defineComponent } from "vue";
import { GoogleMap, Marker } from "vue3-google-map";
export default defineComponent({
  components: { GoogleMap, Marker },
  setup() {
    const mapStyle = {
      mapTypeControl: false,
    };
    const center = {
      lat: 37.09024,
      lng: -95.712891,
    };
    const zoom = 4;
    const options = { componentRestrictions: { country: "US" } };

    const setFromtownPlace = (place) => {
      console.log(place);
    };
    return {
      mapStyle,
      options,
      center,
      zoom,
      setFromtownPlace,
    };
  },
});
</script>

<style>
.map-wrapper {
  height: calc(100vh - 56px);
}
</style>
