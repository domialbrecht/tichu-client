<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, PropType, inject } from 'vue'
import IconSwap from '~icons/mdi/swapHorizontal'
import PlayerCard from '../helpers/PlayerCard.vue'
import { IPlayer, IHostSetting, type IPlayerSwapTeam } from '~/types'
import { PlayerPlaceholder } from '~/defs'
export default defineComponent({
  components: {
    PlayerCard,
    IconSwap
  },
  props: {
    jkey: { type: String, default: '' },
    isHost: { type: Boolean, default: false },
    players: { type: Array as PropType<Array<IPlayer>>, required: true },
    hostSettings: { type: Object as PropType<IHostSetting>, required: true }
  },
  emits: ['start'],
  setup(props, { emit }) {
    const socket: Socket = inject('socket')!
    const copyKey = () => {
      navigator.clipboard.writeText(props.jkey)
    }
    const winAmount = ref(props.hostSettings.winAmount)
    const playerToSwitch = ref<IPlayer>(PlayerPlaceholder)
    const playerSwapTeam = ref<IPlayerSwapTeam>()
    const switchInProgress = ref(false)
    const switchPlayer = (p: IPlayer) => {
      if (!switchInProgress.value) {
        playerToSwitch.value = p
        switchInProgress.value = true
        return
      }
      const gameId = props.jkey.split('key=')[1]
      playerSwapTeam.value = { gameId: gameId, player1: playerToSwitch.value.id, player2: p.id }
      socket.emit('player-swap-team', playerSwapTeam.value)
      switchInProgress.value = false
      playerToSwitch.value = PlayerPlaceholder
    }
    const onStart = () => {
      emit('start')
    }
    const settingChanged = () => {
      socket.emit('settingChanged', { winAmount: winAmount.value })
    }
    socket.on('newSettings', (settings) => {
      winAmount.value = settings.winAmount
    })
    return {
      copyKey,
      winAmount,
      settingChanged,
      onStart,
      switchPlayer,
      playerToSwitch
    }
  }
})
</script>
<template>
  <div class="w-3/4 mx-auto py-16 h-full flex flex-col justify-between items-center">
    <div class="grid grid-cols-2 grid-rows-2 gap-4">
      <span class="text-3xl mr-6">Gwinnpunktzahl</span>
      <input
        v-model="winAmount"
        :disabled="!isHost"
        class="mt-0 block px-0.5 text-darker text-xl text-center border-0 focus:ring-0 focus:border-white"
        @change="settingChanged"
      />
    </div>
    <div class="grid grid-cols-4 gap-12">
      <div v-for="(p, i) in players" :key="p.id" class="flex flex-col items-center">
        <PlayerCard :name="p.name" />
        <div v-if="i > 0 && isHost">
          <IconSwap
            class="text-4xl cursor-pointer"
            :class="playerToSwitch.id === p.id ? 'text-highlight' : ''"
            @click="switchPlayer(p)"
          />
        </div>
      </div>
      <div v-for="n in 4 - players.length" :key="n" class="flex flex-col items-center">
        <div class="mb-5 flex-grow bg-white w-full rounded-full"></div>
        <div>Läär</div>
      </div>
    </div>
    <div v-if="players.length !== 4" class="flex justify-between w-full items-center">
      <div>
        <button
          class="px-8 py-3 text-2xl text-dark tracking-widest bg-highlight hover:bg-contrast uppercase border-0 rounded-4xl focus:ring-0 focus:outline-none"
          @click="copyKey"
        >
          Iladig kopiere
        </button>
      </div>
    </div>
    <div v-if="!isHost">
      <h3 class="text-3xl">Der Host wrid z Spiu starte</h3>
    </div>
    <button
      v-if="players.length === 4 && isHost"
      class="cursor-pointer heroButton px-8 py-3 text-2xl text-dark relative tracking-widest bg-highlight hover:bg-contrast uppercase border-0 rounded-4xl focus:outline-none"
      @click="onStart"
    >
      Starte
    </button>
  </div>
</template>
