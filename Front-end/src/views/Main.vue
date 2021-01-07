<template>
  <div>
    Main
  </div>
</template>

<script>
// import { onMounted } from "vue";
import { mapActions } from "vuex";
export default {
  name: "Main",
  methods: {
    ...mapActions({
      getUsers: "player/getPlaygers",
    }),
  },
  async mounted() {
    const data = await this.getUsers();
    console.log("data", data);
  },
  //   setup() {
  //     onMounted(() => {
  //       this.getUsers();
  //     });
  //   },
};
</script>
