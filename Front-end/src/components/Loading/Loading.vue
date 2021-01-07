<template>
  <div class="p-10">
    <LoadingIcon class="loading" />
  </div>
</template>

<script>
import LoadingIcon from '@/assets/icons/loading.svg'
export default {
  name: 'Loading',
  components: {
    LoadingIcon,
  },
}
</script>

<style scoped>
.loading {
  height: 60px;
  width: auto;
  fill: #000
}
</style>
