<template>
  <section>
    <!-- Title -->
    <h2 class="font-semibold text-base mb-1 sm:mb-3 px-2 sm:px-0">
      {{ title }}
    </h2>

    <!-- Table -->
    <table class="table-auto w-full">
      <!-- Table header -->
      <thead class="border-t border-b border-gray-300">
        <tr class="text-left uppercase text-xs text-gray-700">
          <th
            v-for="(item, i) in headers"
            :key="i"
            class="py-1 px-1"
            :class="{
              'w-1/2 pl-2': item.value === 'player',
              'w-1/12 pl-2': item.value !== 'player',
            }"
            @click="handleSort(item.value)"
          >
            <div
              class="flex items-center cursor-pointer hover:text-blue-500"
              :class="{ 'text-blue-500': sortingFactor === item.value }"
            >
              <span class="mr-2">
                {{ item.text }}
              </span>
              <span class="flex flex-col">
                <SortingIcon class="sorting-svg" />
              </span>
            </div>
          </th>
        </tr>
      </thead>

      <!-- Table body -->
      <tbody>
        <tr v-for="(item, index) in localItems" :key="index">
          <td
            class="text-gray-500 text-xs px-1"
            :class="{ 'bg-gray-100': (index + 1) % 2 === 0 }"
            v-for="(header, i) in headers"
            :key="i"
          >
            <div v-if="item[header.value].name" class="flex items-center px-1">
              <span class="pl-3 pr-4 text-gray-500 text-xs">
                {{ item[header.value].row }}
              </span>
              <figure class="h-10 pr-4">
                <img
                  :src="require(`@/assets/logos/${item[header.value].img}.png`)"
                  :alt="item[header.value].name"
                  class="h-full"
                />
              </figure>
              <span class="capitalize text-sm text-blue-600 cursor-pointer">{{
                item[header.value].name
              }}</span>
            </div>

            <span v-else>
              {{ item[header.value] }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script>
import SortingIcon from '@/assets/icons/sorting-icon.svg'

export default {
  name: 'Table',
  components: {
    SortingIcon,
  },
  props: {
    title: String,
    headers: Array,
    items: Array,
  },
  mounted() {
    // get a copy of data in local
    this.localItems = this.items
  },
  watch: {
    items: function() {
      this.localItems = this.items
    },
  },
  data: () => ({
    localItems: [],
    sortingFactor: '',
  }),
  methods: {
    handleSort(value) {
      if (value === 'player') {
        this.localItems.sort((a, b) => {
          if (a.player.row > b.player.row) {
            return b.player.row - a.player.row
          } else {
            return a.player.row - b.player.row
          }
        })
      } else {
        this.localItems.sort((a, b) => {
          if (a[value] > b[value]) {
            return b[value] - a[value]
          } else {
            return a[value] - b[value]
          }
        })
      }

      this.sortingFactor = value
    },
  },
}
</script>
<style scoped>
.sorting-svg {
  width: 9px;
  height: auto;
  fill: currentColor;
}
</style>
