<template>
  <div id="app">
    <Header />
    <!-- <div id="nav"></div> -->
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "@/components/Header/Header";
export default {
  name: "App",
  components: {
    Header,
  },
};
</script>
