<template>
  <div
    class="flex justify-between items-center border-b border-df-brown border-opacity-25 relative pb-1"
  >
    <!-- Placeholder -->
    <span
      class="absolute pointer-events-none top-0"
      :class="{
        'transform -translate-y-5 text-xs transition-all':
          modelValue.length !== 0,
      }"
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
    <SearchIcon v-if="!inputFlag" fill="#451400" class="h-5" />

    <!-- Icons -->
    <CloseIcon
      v-else
      fill="#451400"
      class="h-4 cursor-pointer"
      @click="$emit('clearInput')"
    />
  </div>
</template>

<script>
import SearchIcon from "@/assets/icons/search.svg";
import CloseIcon from "@/assets/icons/cancel.svg";

export default {
  name: "TextInput",
  emits: ["update:modelValue", "keyup", "clearInput"],
  components: {
    SearchIcon,
    CloseIcon,
  },
  props: {
    modelValue: {
      type: String,
      required: false,
      default: "",
    },
    type: {
      type: String,
      required: false,
      default: "text",
    },
    placeholder: {
      type: String,
      required: false,
      default: "",
    },
    inputFlag: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
};
</script>
