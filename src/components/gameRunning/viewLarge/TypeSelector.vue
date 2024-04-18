<script lang="ts">
import { defineComponent } from 'vue'
import SchiebeIcon from '~/components/helpers/SchiebeIcon.vue'
export default defineComponent({
  components: { SchiebeIcon },
  props: {
    hideswitch: { type: Boolean, default: false }
  },
  emits: ['selected'],
  setup(props, { emit }) {
    const selectType = (type: string) => {
      emit('selected', type)
    }
    return {
      selectType
    }
  }
})
</script>
<template>
  <div class="absolute top-0 left-0 w-full h-full flex items-center bg-black bg-opacity-40">
    <div class="container mx-auto grid grid-cols-5 gap-4 z-10 text-dark"></div>
    <div v-if="!hideswitch" class="h-60 w-52 flex flex-col items-center p-4 bg-orange-400">
      <span class="text-2xl">Schiebe</span>
      <button
        class="flex items-center justify-center rounded-2xl w-full h-5/6 text-dar"
        @click="selectType('switch')"
      >
        <SchiebeIcon />
      </button>
    </div>
  </div>
</template>
<style scoped>
button:focus {
  outline: 0;
}
</style>
