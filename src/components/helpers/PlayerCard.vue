<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
import type { IPlayer } from '~/types'
export default defineComponent({
  props: {
    name: { type: String, required: true },
    inBoard: { type: Boolean, default: false },
    tiny: { type: Boolean, default: false },
    assigned: { type: Boolean, default: true },
    highlight: { type: Boolean, default: false }
  },
  setup(props, { emit }) {
    const displayClasses = computed(() => {
      return {
        'text-dark': props.inBoard && !props.highlight,
        'text-highlight': props.highlight,
        'text-3xl': props.inBoard && !props.tiny,
        'text-2xl': !props.inBoard && !props.tiny,
        'text-lg': props.tiny
      }
    })
    const getPlayerColor = (place: number) => {
      return '#ebebeb12'
      // if (!props.assigned) return '#ebebeb12'
      // return place % 2 ? '#9D174D' : '#1E40AF'
    }
    return { getPlayerColor, displayClasses }
  }
})
</script>
<template>
  <svg
    id="Layer_1"
    class="w-full"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 68 64"
    :class="!inBoard ? 'mb-2' : tiny ? 'h-8 w-8' : ''"
  >
    <ellipse cx="34" cy="32" rx="32.5" ry="30.5" :fill="getPlayerColor(0)" />
    <path
      fill="white"
      d="M34,3C51.09,3,65,16,65,32S51.09,61,34,61,3,48,3,32,16.91,3,34,3m0-3C15.22,0,0,14.33,0,32S15.22,64,34,64,68,49.67,68,32,52.78,0,34,0Z"
    />
    <ellipse cx="17.5" cy="32.5" rx="5" ry="8" fill="#f1eaea" />
    <path
      d="M17.5,25c2.44,0,4.5,3.43,4.5,7.5S19.94,40,17.5,40,13,36.57,13,32.5,15.06,25,17.5,25m0-1c-3,0-5.5,3.81-5.5,8.5S14.46,41,17.5,41,23,37.19,23,32.5,20.54,24,17.5,24Z"
    />
    <ellipse cx="50.5" cy="32.5" rx="5" ry="8" fill="#f1eaea" />
    <path
      d="M50.5,25c2.44,0,4.5,3.43,4.5,7.5S52.94,40,50.5,40,46,36.57,46,32.5,48.06,25,50.5,25m0-1c-3,0-5.5,3.81-5.5,8.5S47.46,41,50.5,41,56,37.19,56,32.5,53.54,24,50.5,24Z"
    />
    <ellipse cx="17.5" cy="34" rx="4" ry="4.5" />
    <path
      d="M17.5,30A3.78,3.78,0,0,1,21,34a3.78,3.78,0,0,1-3.5,4A3.78,3.78,0,0,1,14,34a3.78,3.78,0,0,1,3.5-4m0-1A4.77,4.77,0,0,0,13,34a4.77,4.77,0,0,0,4.5,5A4.77,4.77,0,0,0,22,34a4.77,4.77,0,0,0-4.5-5Z"
    />
    <path
      d="M50.14,38.63a4.39,4.39,0,0,1-3.82-4.85,4.42,4.42,0,0,1,4.18-4.3h.25a4.39,4.39,0,0,1,3.82,4.86,4.41,4.41,0,0,1-4.18,4.3Z"
    />
    <path
      d="M50.5,30h.22a3.44,3.44,0,0,1,2.45,1.33,4.36,4.36,0,0,1,.9,3,3.92,3.92,0,0,1-3.68,3.84h-.22a3.4,3.4,0,0,1-2.45-1.32,4.38,4.38,0,0,1-.9-3A3.92,3.92,0,0,1,50.5,30m0-1a4.9,4.9,0,0,0-4.67,4.77,4.86,4.86,0,0,0,4.28,5.38h.28a4.91,4.91,0,0,0,4.68-4.77A4.88,4.88,0,0,0,50.79,29Z"
    />
    <path
      d="M17.5,47.56s1,6.94,17,6.94,16-6.5,16-6.5"
      fill="none"
      stroke="#000"
      stroke-miterlimit="10"
      stroke-width="2"
    />
  </svg>
  <div class="uppercase" :class="displayClasses">
    {{ name }}
  </div>
</template>
