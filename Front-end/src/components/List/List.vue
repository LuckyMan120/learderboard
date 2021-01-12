<template>
  <section class="mt-1 mb-2">
    <!-- title -->
    <h3
      v-if="items.length > 0"
      class="uppercase font-bold mb-2 text-lg text-df-brown px-5 ml-2"
    >
      {{ title }}
    </h3>
    <!-- items -->
    <ul v-if="items.length > 0">
      <li
        v-for="item in items"
        :key="item.id"
        class="list-item pt-3 flex flex-col relative cursor-pointer px-5"
        @click="$emit('item-click', item.id)"
      >
        <!-- Title -->
        <span class="font-bold">{{ item.title }}</span>
        <!-- Subtitle -->
        <span class="">{{ item.subtitle }}</span>

        <!-- divider -->
        <i class="border-b border-df-brown border-opacity-20 mt-3"></i>
      </li>
    </ul>
    <!-- No item message -->
    <div v-else class="flex flex-col justify-center items-center py-10">
      <!-- No item img -->
      <img src="@/assets/logos/logo.png" alt="logo" class="w-20" />
      <!-- No item text -->
      <span class="text-df-brown mt-5 opacity-70 text-center px-5"
        >Find a Chipotle to order online, see a menu, and get info.</span
      >

      <div class="mt-10 w-full">
        <!-- No item header -->
        <h3 class="uppercase font-bold mb-2 text-lg ml-5">
          {{ title }}
        </h3>

        <div
          class="border-t border-b border-opacity-10 border-df-brown flex flex-col justify-center items-center py-5 px-5"
        >
          <!-- No item icon -->
          <TargetLocation class="mb-3" />
          <!-- No item text -->
          <span class="text-sm text-center opacity-70"
            >Tap the target to find the closest Chipotle</span
          >
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import TargetLocation from '@/assets/icons/location-target.svg'

export default {
  name: 'List',
  emits: ['item-click'], // return id
  props: {
    title: String,
    items: Array,
  },
  components: {
    TargetLocation,
  },
}
</script>

<style scoped>
/* This css is just only for hover slide effect */
.list-item::before {
  content: '';
  height: 100%;
  width: 0;
  display: block;
  background: #f0f0f0;
  position: absolute;
  left: 0;
  top: 0;
  transition: all 0.2s ease;
  z-index: -1;
}
.list-item:hover::before {
  width: 100%;
}
</style>
