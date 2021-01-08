<template>
  <div class="px-4 py-2 flex justify-between items-center bg-gray-200">
    <router-link to="/">
      <img
        src="@/assets/logos/logo.png"
        title="Logo"
        alt="Logo"
        class="w-10 h-10"
      />
    </router-link>

    <div>
      <router-link class="px-4" to="/">Leaderboard</router-link>
      <router-link class="px-4" to="/map">Map</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
};
</script>
