<script lang="ts">
import { defineComponent } from 'vue'
import IconStoeck from '~/components/helpers/WisStoeckIcon.vue'
export default defineComponent({
  components: { IconStoeck },
  emits: ['selected', 'send'],
  setup(props, { emit }) {
    const selectType = (type: string) => {
      emit('selected', type)
    }
    const submitWis = () => {
      emit('send')
    }
    return {
      selectType,
      submitWis
    }
  }
})
</script>
<template>
  <div
    class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center bg-black bg-opacity-40"
  >
    <div class="container mx-auto z-10 text-dark">
      <div class="grid grid-cols-3 gap-4">
        <div class="h-60 w-52 flex flex-col items-center p-4">
          <span class="text-2xl uppercase">Stoeck</span>
          <button
            class="flex items-center justify-center rounded-2xl w-full h-5/6 text-dark"
            @click="selectType('stoeck')"
          >
            <IconStoeck />
          </button>
        </div>
      </div>
      <div class="mt-2 mb-3 flex justify-center">
        <button
          class="px-8 py-3 text-2xl text-dark tracking-widest bg-highlight hover:bg-contrast uppercase rounded-4xl"
          @click="submitWis"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
button:focus {
  outline: 0;
}
</style>
