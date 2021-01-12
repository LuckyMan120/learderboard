<template>
  <div
    class="flex justify-between items-center border-b border-df-brown border-opacity-25 relative pb-1"
  >
    <!-- Placeholder -->
    <span
      class="absolute pointer-events-none top-0"
      :class="{ 'transform -translate-y-5 text-xs transition-all': modelValue.length !== 0 }"
      >{{ placeholder }}</span
    >

    <!-- Input -->
    <input
      :type="type"
      class="focus:outline-none placeholder-df-brown w-full pr-2"
      :value="modelValue"
      @keyup="$emit('keyup', $event)"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <SearchIcon v-if="modelValue.length === 0" fill="#451400" class="h-5" />

    <!-- Icons -->
    <CloseIcon
      v-else
      fill="#451400"
      class="h-4 cursor-pointer"
      @click="$emit('update:modelValue', '')"
    />
  </div>
</template>

<script>
import SearchIcon from '@/assets/icons/search.svg'
import CloseIcon from '@/assets/icons/cancel.svg'

export default {
  name: 'TextInput',
  emits: ['update:modelValue', 'keyup'],
  components: {
    SearchIcon,
    CloseIcon,
  },
  props: {
    modelValue: String,
    type: String,
    placeholder: String,
  },
}
</script>
