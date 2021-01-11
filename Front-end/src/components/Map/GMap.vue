<template>
  <div class="map-wrapper col-span-4" ref="mapDivRef"></div>
</template>

<script>
import { ref, onMounted, watch, toRefs } from "vue";

export default {
  name: "GMap",
  props: {
    center: {
      type: Object,
      required: false,
      default: null,
    },
    zoom: {
      type: Number,
      required: false,
      default: 8,
    },
    mapType: {
      type: String,
      required: false,
      default: "",
    },
    disableUI: {
      type: Boolean,
      required: false,
      default: false,
    },
    markers: {
      type: Array,
      required: false,
      default: null,
    },
    mapDidLoad: {
      type: Function,
    },
  },
  setup(props) {
    // the google map object
    const map = ref(null);
    // the map element in the templete
    const mapDivRef = ref(null);
    // markers on the map
    let currentMarkers = [];

    // markers
    let { markers } = toRefs(props);

    // load in the googel script
    onMounted(() => {
      // create the script element to load
      const googleMapScript = document.createElement("SCRIPT");
      googleMapScript.setAttribute(
        "src",
        `https://maps.googleapis.com/maps/api/js?key=AIzaSyDoi0kDoetjxsvsctCrRb99I5lu1GJMj_8&callback=initMap`
      );
      googleMapScript.setAttribute("defer", "");
      googleMapScript.setAttribute("async", "");
      document.head.appendChild(googleMapScript);
    });

    // remove the map from the marker and empty the array
    const clearMarkers = () => {
      currentMarkers.forEach((m) => {
        m.setMap(null);
      });

      currentMarkers = [];
    };

    // maping markers
    const loadMapMarkers = () => {
      if (!props.markers.length) return;

      // always clear before loading...
      clearMarkers();

      // push marker on the map
      props.markers.forEach((markerInfo) => {
        const mapMarker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(
            markerInfo.lat,
            markerInfo.long
          ),
          map: map.value,
          title: markerInfo.venuename,
        });

        // info window
        mapMarker.infoWindow = new window.google.maps.InfoWindow({
          content: markerInfo.venuename,
        });

        // add listener
        mapMarker.addListener("click", () => {
          if (mapMarker.infoWindow !== null) {
            mapMarker.infoWindow.open(map.value, mapMarker);
          }
        });

        // add to local marker
        currentMarkers.push(mapMarker);
      });
    };

    // need to watch the props.markers to see if
    // the map needs to be updated
    watch(markers, (/*old, new*/) => {
      loadMapMarkers();
    });

    // this function is called as soon as map is initialized
    window.initMap = () => {
      map.value = new window.google.maps.Map(mapDivRef.value, {
        mapTypeId: props.mapType || "hybrid",
        zoom: props.zoom || 4,
        disableDefaultUI: props.disableUI || false,
        center: props.center || { lat: 37.09024, lng: -95.712891 },
      });

      loadMapMarkers();

      //   let everyone know the map is loaded and ready, return
      // map and access to the map services
      props.mapDidLoad && props.mapDidLoad(map, window.google.maps);
    };

    return {
      mapDivRef,
      map,
    };
  },
};
</script>
