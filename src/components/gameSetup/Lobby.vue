<script lang="ts">
import { Socket } from 'socket.io-client'
import { ref, defineComponent, inject, onBeforeMount } from 'vue'
import Entry from './Entry.vue'
import Waiting from './Waiting.vue'
import { IPlayer, IHostSetting } from '~/types'
import axios from 'axios'

export default defineComponent({
  components: {
    Entry,
    Waiting
  },
  props: {
    jkey: { type: String, default: '' }
  },
  emits: ['gstart'],
  setup(props, { emit }) {
    const clientIsHost = ref(false)
    const joinKey = ref('')
    const nameInput = ref('')
    const p: IPlayer[] = []
    const players = ref(p)
    const hostSettings = ref<IHostSetting>({
      winAmount: 1000
    })
    const socket: Socket = inject('socket')!
    const setupComplete = ref(false)
    onBeforeMount(() => {
      if (props.jkey) joinKey.value = props.jkey
    })
    const serverConnect = (username: string, host: boolean, key: string) => {
      socket.auth = { username, host, key }
      socket.connect()
    }
    const onHost = (name: string) => {
      clientIsHost.value = true
      nameInput.value = name
      serverConnect(name, clientIsHost.value, '')
      socket.emit('create-lobby', name)
    }
    const onJoin = (name: string) => {
      if (joinKey.value) {
        nameInput.value = name
        socket.connect()
        const data = {
          username: name,
          game_id: joinKey.value
        }
        socket.emit('connect-lobby', data)
        joinKey.value = `${window.location.origin}/game?key=${joinKey.value}`
        //serverConnect(name, false, joinKey.value)
      }
    }
    const onStart = () => {
      if (clientIsHost.value) {
        const data = {
          gameId: joinKey.value.split('key=')[1]
        }
        axios.patch('http://localhost:3000/start', data)
        console.log(players.value)
        emit('gstart', players.value)
      }
    }
    socket.on('started', () => {
      emit('gstart', players.value)
    })
    socket.on('lobby-created', (key: string) => {
      joinKey.value = `${window.location.origin}/game?key=${key}`
      const player = {
        self: true,
        isHost: true,
        id: socket.id,
        name: nameInput.value,
        place: 0
      }
      players.value.push(player)
      setupComplete.value = true
    })

    socket.on('users-in-lobby', (...sp) => {
      console.log('sp', sp)
      sp.map((p: IPlayer) => {
        return {
          self: p.id === socket.id,
          isHost: p.isHost,
          id: p.id,
          name: p.name,
          place: p.place
        }
      })
      players.value = sp
      setupComplete.value = true
    })

    socket.on('user-joined', (p: IPlayer) => {
      const new_player = {
        self: p.id === socket.id,
        isHost: p.isHost,
        id: p.id,
        name: p.name,
        place: p.place
      }
      players.value.push(new_player)
    })

    socket.on('abandoned', () => {
      nameInput.value = ''
      players.value = []
      joinKey.value = ''
      setupComplete.value = false
    })
    socket.on('connect_error', (err) => {
      if (err.message === 'invalid username') {
        nameInput.value = ''
        players.value = []
      }
    })
    return {
      joinKey,
      nameInput,
      players,
      setupComplete,
      onHost,
      onJoin,
      clientIsHost,
      hostSettings,
      onStart
    }
  }
})
</script>

<template>
  <div class="flex items-center h-full relative">
    <div class="absolute animate-wiggle text-contrast text-7xl left-2 2xl:left-8 top-20">
      <span>♥</span>
    </div>
    <div class="absolute animate-wiggle text-deep right-2 2xl:right-8 text-7xl top-80">
      <span>♠</span>
    </div>
    <div class="absolute animate-wiggle text-contrast text-7xl left-2 2xl:left-8 bottom-80">
      <span>♦️</span>
    </div>
    <div class="absolute animate-wiggle text-deep right-2 2xl:right-8 text-7xl bottom-20">
      <span>♣️</span>
    </div>
    <div class="container bg-emerald-900 text-dark h-4/5 mx-auto rounded-[40px]">
      <Entry v-if="!setupComplete" :jkey="joinKey" @host="onHost" @join="onJoin" />
      <Waiting
        v-else
        :is-host="clientIsHost"
        :jkey="joinKey"
        :players="players"
        :host-settings="hostSettings"
        @start="onStart"
      />
    </div>
  </div>
</template>
<style>
.bgEntry {
  background-image: radial-gradient(circle, #163e94 1%, #131952 99%);
}
</style>
