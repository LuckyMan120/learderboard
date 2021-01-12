<template>
  <button
    @click="$emit('click', $event)"
    class="p-2 shadow-button rounded-full focus:outline-none bg-white overflow-hidden"
    :class="{ 'pa-1': icon, button: !icon }"
  >
    <!-- Text -->
    <span
      v-if="!icon"
      class="uppercase text-df-brown text-sm font-bold tracking-widest px-4"
    >
      {{ isHovered }}
      <slot></slot>
    </span>

    <!-- Icon -->
    <div v-if="icon" class="w-6 h-6">
      <slot name="icon"></slot>
    </div>
  </button>
</template>

<script>
export default {
  name: 'Button',
  emits: ['click'],
  props: {
    icon: Boolean,
    rounded: Boolean,
  },
}
</script>

<style scoped>
/* This css is just only for hover slide effect */
.button::before {
  content: '';
  height: 100%;
  width: 0;
  display: block;
  background: #F0F0F0;
  position: absolute;
  left: 0;
  top: 0;
  transition: all .2s ease;
  z-index: -1;
}
.button:hover::before {
  width: 100%;
}
</style>
