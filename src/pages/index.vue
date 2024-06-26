<script setup lang="ts">
import { onMounted, onUnmounted, computed, ref } from 'vue'
// import { fetchGameStats } from '~/api/database'
import Rules from '~/components/Rules.vue'
import Further from '~/components/Further.vue'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import KingCard from '~/components/helpers/KingCard.vue'
import JackCard from '~/components/helpers/JackCard.vue'
import NumberCard from '~/components/helpers/NumberCard.vue'
import NumberSpinner from '~/components/helpers/NumberSpinner.vue'

const cardRotate = ref(10)
const getRotateStyle = (i: number): any => {
  return {
    transform: `translate(0%, ${28 - cardRotate.value * i}%) rotate(-${cardRotate.value * i}deg)`
  }
}
const cards = computed(() => {
  return [
    {
      component: NumberCard,
      styles: getRotateStyle(0)
    },
    {
      component: JackCard,
      styles: getRotateStyle(1)
    },
    {
      component: KingCard,
      styles: getRotateStyle(2)
    }
  ]
})
function handleSroll() {
  const rTamount = 10
  const scrollPixelDuration = 200
  const dR = rTamount / scrollPixelDuration
  if (window.scrollY < scrollPixelDuration) cardRotate.value = 10 - dR * window.scrollY
  else cardRotate.value = 10 - dR * 200
}
onMounted(() => {
  window.addEventListener('scroll', handleSroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleSroll)
})
</script>

<template>
  <Header />
  <main>
    <div class="relative heroContainer gradient-main">
      <div class="pt-12 pb-40 absolute top-0 right-0 left-0 bottom-0 hero">
        <div class="flex flex-col container mx-auto pl-12 pr-24 h-full">
          <div class="flex justify-between items-center h-full">
            <div class>
              <div>
                <h1 class="mb-8 text-8xl text-dark font-sans font-thin uppercase">
                  TICHU Online
                  <br />Rustified.
                </h1>
                <div>
                  <router-link
                    class="px-8 py-3 text-2xl text-white relative tracking-widest bg-highlight uppercase heroButton"
                    to="/game"
                    title="game"
                  >
                    <span class="heroButtonOverlay"></span>
                    <span class="label relative z-10">Start Game</span>
                  </router-link>
                </div>
              </div>
            </div>
            <div class="relative z-10 h-full cardWrapper">
              <div v-for="(card, i) in cards" :key="i" class="z-10 card" :style="card.styles">
                <div class="playing-card-container">
                  <div class="playing-card">
                    <component :is="card.component"></component>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="uppercase text-dark text-2xl">
            <span class="desc">
              <NumberSpinner :loading="false" :value="3" label="Spiu gspiut" />
            </span>
            <span class="desc">64 Bure Gwise</span>
            <span class="desc">Mark 10 Streak</span>
          </div>
        </div>
      </div>
    </div>
    <Rules />
    <Further />
  </main>
  <Footer />
</template>

<style scoped>
.heroContainer {
  height: 94vh;
  min-height: 860px;
  max-height: 926px;
  background-color: #2b2e4a;
}

.cardWrapper {
  width: 450px;
  display: flex;
  align-items: center;
}

@media (max-width: 1800px) {
  .cardWrapper {
    width: 350px;
  }
}

.card {
  width: 100%;
  position: absolute;
  transition: transform 0.5s;
}

.desc {
  margin-right: 20px;
}

.desc:not(:last-child)::after {
  padding-left: 20px;
  content: '|';
}
</style>
